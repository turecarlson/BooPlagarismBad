import { expect } from "chai";
import chai = require("chai");
import chaiSpies = require("chai-spies");
import chaiAsPromised = require("chai-as-promised");
import { ISubmissionDAO, SubmissionDAO } from "../src/model/SubmissionDAO";
import { ISubmissionManager, SubmissionManager } from "../src/manager/SubmissionManager";
import { ISubmission, Submission } from "../src/model/Submission";
import SubmissionData from "../src/types/SubmissionData"
import { AnalysisResultEntry } from "../src/model/AnalysisResultEntry";
import fs from 'fs';

describe("SubmissionManager.ts",() => {

    var testSubmissionDAO : ISubmissionDAO;
    var testSubmissionManager : ISubmissionManager;
    var testSubmission : ISubmission;
    var testSubmissionId : String;
    var testSubmissionName : String;
    var testSubmissionAssignmentId : String;
    var testFilePath : string;

    before(()=>{
        chai.use(chaiSpies);
        chai.use(chaiAsPromised);
    });

    beforeEach(()=>{
        testSubmissionDAO = new SubmissionDAO();
        testSubmissionManager = new SubmissionManager(testSubmissionDAO);
        testSubmissionId = "test_sid";
        testSubmissionName = "testname";
        testSubmissionAssignmentId = "test_aid"; //Note: this is not assigned here (assigned in tests)
        testSubmission = new Submission(testSubmissionId,testSubmissionName);
        testFilePath = "/vagrant/bpb-back/package.json";
    });

    describe("getSubmission()",() => {
        
        it("Should return submission if the provided ID is valid",()=> {
            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',() =>{return Promise.resolve(testSubmission)});

            return testSubmissionManager.getSubmission(testSubmissionId).then((submission) => {
                expect(submission).to.deep.equal(testSubmission);
                expect(mockReadSubmission).to.have.been.called.with(testSubmissionId);
            })
        });

        it("Should throw an error if there is no submission with the provided ID",() =>{
            
            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',() =>{return Promise.reject(new Error("No submission exists with id"))});
            
            return testSubmissionManager.getSubmission("some_nonexistent_id").then((submission) => {
                expect(true,"getSubmission is succeeding where it should fail (should not find submission with nonexistent id)").to.equal(false);
            }).catch((err) => {
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("No submission exists with id");
            });
        });
    });
    describe("getSubmissions()",() => {
        
        it("Should return submissions of the given assignment if there are some",()=> {
            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmissions',() =>{return Promise.resolve([testSubmission])});

            return testSubmissionManager.getSubmissions(testSubmissionAssignmentId).then((submissions) => {
                expect(submissions[0]).to.deep.equal(testSubmission);
                expect(mockReadSubmission).to.have.been.called.with(testSubmissionAssignmentId);
            })
        });

        it("Should return no submissions if there are none",() =>{
            chai.spy.on(testSubmissionDAO,'readSubmissions',() =>{return Promise.resolve([])});
            expect(testSubmissionManager.getSubmissions(testSubmissionAssignmentId)).to.eventually.be.fulfilled.with.an("array").that.is.empty;
        });        
    });

    describe("createSubmission()",() => {
        
        it("Should properly create a submission if body parameters are correct (includes name, assignment_id)",() => {
            
            chai.spy.on(testSubmissionDAO,'createSubmission',() => {return Promise.resolve(testSubmission)});

            var createBody : SubmissionData = {name:testSubmission.getName(),assignment_id:testSubmissionAssignmentId};

            return testSubmissionManager.createSubmission(createBody).then((submission) => {
                expect(submission.getName()).to.equal(testSubmission.getName());
                expect(submission.getAssignmentId()).to.equal(testSubmission.getAssignmentId());
            });
        });
    });

    describe("updateSubmission()",() => {
        
        it("Should properly update a submission if body parameters are included and submission exists with id",() => {
                        
            chai.spy.on(testSubmissionDAO,'readSubmission',() => {return Promise.resolve(testSubmission)});
            chai.spy.on(testSubmissionDAO,'updateSubmission',(submission) => {return Promise.resolve(submission)}); //Pass through

            var expectedNewName = "test";
            var expectedNewAssnId = "test2";

            var updateBody = {name:expectedNewName,assignment_id:expectedNewAssnId};

            return testSubmissionManager.updateSubmission(testSubmission.getId(),updateBody).then((submission) => {
                expect(submission.getName()).to.equal(expectedNewName);
                expect(submission.getAssignmentId()).to.equal(expectedNewAssnId);
                expect(submission.getId()).to.equal(testSubmission.getId());
            });
        });

        it("Should properly update a submission if submission exists and only one new body parameter is provided (name)",() => {
            testSubmission.setAssignmentId(testSubmissionAssignmentId);
            chai.spy.on(testSubmissionDAO,'readSubmission',() => {return Promise.resolve(testSubmission)});
            chai.spy.on(testSubmissionDAO,'updateSubmission',(submission) => {return Promise.resolve(submission)}); //Pass through

            var expectedNewName = "test";

            var updateBody : SubmissionData = {name:expectedNewName, assignment_id: testSubmission.getAssignmentId()};

            return testSubmissionManager.updateSubmission(testSubmission.getId(),updateBody).then((submission) => {
                expect(submission.getName()).to.equal(expectedNewName);
                expect(submission.getAssignmentId()).to.equal(testSubmissionAssignmentId);
                expect(submission.getId()).to.equal(testSubmission.getId());
            });
        });

        it("Should properly update a submission if submission exists and only one new body parameter is provided (assignment_id)",() => {
            chai.spy.on(testSubmissionDAO,'readSubmission',() => {return Promise.resolve(testSubmission)});
            chai.spy.on(testSubmissionDAO,'updateSubmission',(submission) => {return Promise.resolve(submission)}); //Pass-through updated submission

            var expectedNewAssnId = "test2";

            var updateBody : SubmissionData = {name: testSubmission.getName(), assignment_id:expectedNewAssnId};

            return testSubmissionManager.updateSubmission(testSubmission.getId(),updateBody).then((submission) => {
                expect(submission.getName()).to.equal(testSubmissionName);
                expect(submission.getAssignmentId()).to.equal(expectedNewAssnId);
                expect(submission.getId()).to.equal(testSubmission.getId());
            });
        });
        
        it("Should return an appropriate error if submission doesn't exist with the provided id",() => {
            chai.spy.on(testSubmissionDAO,'readSubmission',() => {return Promise.reject(new Error("Submission does not exist"))});
            chai.spy.on(testSubmissionDAO,'updateSubmission');

            var expectedNewName = "test";
            var expectedNewAssnId = "test2";

            var updateBody : SubmissionData = {name:expectedNewName,assignment_id:expectedNewAssnId};

            return testSubmissionManager.updateSubmission(testSubmission.getId(),updateBody).then((submission) => {
                expect(true,"updateSubmission is succeeding where it should fail (no submission exists with submission id)").to.equal(false);
            }).catch((err) => {
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("Submission does not exist");
            });
        });
    });

    describe("processSubmissionFile()",() =>{

        it("Should save and add a file into the submission specified by the client",() => {

            chai.spy.on(testSubmissionDAO,'readSubmission',() =>{return testSubmission});
            
            var mockAddFile = chai.spy.on(testSubmission,'addFile');
            
            fs.readFile(testFilePath,(err,content) => {

                var expectedContent = content.toString();
                
                return testSubmissionManager.processSubmissionFile(testSubmission.getId(),testFilePath).then(() => {
                    expect(mockAddFile).to.have.been.called.with(expectedContent,testFilePath);
                });
            });
        });

        it("Should return an appropriate error if file was already added to the submission",() => {
                
            testSubmission.addAnalysisResultEntry(new AnalysisResultEntry("test",testFilePath,"test",1,2,"3","4")); //Adds a filePath to the submission
            
            chai.spy.on(testSubmissionDAO,'readSubmission',() =>{return Promise.resolve(testSubmission)});
            var mockAddFile = chai.spy.on(testSubmission,'addFile');
            
            return testSubmissionManager.processSubmissionFile(testSubmission.getId(),testFilePath).then(() => {
                expect(true,"processSubmissionFile is succeeding where it should fail (filePath was already added)").to.equal(false);
            }).catch((err) => {
                expect(mockAddFile).to.not.have.been.called();
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("was already added to the submission");
            });
        });

        it("Should return an appropriate error if submission ID is invalid",() => {
            
            chai.spy.on(testSubmissionDAO,'readSubmission',() => { return Promise.reject(new Error("Submission does not exist")); })
            var mockAddFile = chai.spy.on(testSubmission,'addFile');

            return testSubmissionManager.processSubmissionFile(testSubmission.getId(),testFilePath).then(() => {
                expect(true,"processSubmissionFile is succeeding where it should fail (submission doesn't exist with id)").to.equal(false);
            }).catch((err) => {
                expect(mockAddFile).to.not.have.been.called;
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("Submission does not exist");
            });
        });

        it("Should return an appropriate error if submission file doesn't exist at the specified location",() => {

            chai.spy.on(testSubmissionDAO,'readSubmission',() =>{return Promise.resolve(testSubmission)});
            
            var mockAddFile = chai.spy.on(testSubmission,'addFile');
            
            var nonexistentFilePath = "/test/non/existent/file";
            
            return testSubmissionManager.processSubmissionFile(testSubmission.getId(),nonexistentFilePath).then(() => {
                expect(true,"processSubmissionFile is succeeding where it should fail (file doesn't exist at specified location)").to.equal(false);
            }).catch((err) => {
                expect(mockAddFile).to.not.have.been.called;
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("no such file or directory");
            });
        });
    });

    describe("deleteSubmission({id})",() =>{

        it("Should properly instruct SubmissionDAO to delete a submission if the specified {id} is valid",() =>{
            
            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',() =>{return Promise.resolve(testSubmission)});

            var mockDeleteSubmission = chai.spy.on(testSubmissionDAO,'deleteSubmission'); 
            
            return testSubmissionManager.deleteSubmission(testSubmissionId).then(() => {
                expect(mockReadSubmission).to.have.been.called.with(testSubmissionId);
                expect(mockDeleteSubmission).to.have.been.called.with(testSubmission);
            });
        });
        
        it("Should throw an appropriate error if {id} is invalid",() => {
            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',() =>{throw new Error("No submission found with id")});

            var mockDeleteSubmission = chai.spy.on(testSubmissionDAO,'deleteSubmission'); 
            
            return testSubmissionManager.deleteSubmission(testSubmissionId).then(res => {
                expect(true,"deleteSubmission is succeeding where it should fail (ID should not exist)").to.be.false;
            }).catch((err) => {
                expect(mockReadSubmission).to.have.been.called.with(testSubmissionId);
                expect(mockDeleteSubmission).to.not.have.been.called;
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("No submission exists with id");
            });
        });
    });

    describe("compareSubmission({id_a},{id_b})",()=> {

        it("Should return a valid AnalysisResult if both submissions are valid",() => {
            
            var testSubmission2 = new Submission("somevalid","id");

            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',(submissionId) =>{
                if(submissionId === testSubmission.getId()) {
                    return Promise.resolve(testSubmission);
                } else {
                    return Promise.resolve(testSubmission2);
                }
            });

            return testSubmissionManager.compareSubmissions(testSubmission2.getId(),testSubmission.getId()).then((analysisResult) => {
                expect(analysisResult).to.not.be.undefined; //TODO: Replace with better assertion (?)
                expect(mockReadSubmission).to.have.been.called.with(testSubmission.getId());
                expect(mockReadSubmission).to.have.been.called.with(testSubmission2.getId());
            });
        });

        it("Should return an appropriate error if {id_a} is valid and {id_b} does not exist",() => {

            var testSubmission2 = new Submission("someinvalid","id");

            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',(submissionId) =>{
                if(submissionId === testSubmission2.getId()) {
                    return Promise.reject("");
                } else {
                    return Promise.resolve(testSubmission);
                }
            });

            return testSubmissionManager.compareSubmissions(testSubmission.getId(),testSubmission2.getId()).then(res => {
                expect(true,"compareSubmission is succeeding where it should fail (one id does not exist)").to.be.false;
            }).catch((err) => {
                expect(mockReadSubmission).to.have.been.called.with(testSubmission.getId());
                expect(mockReadSubmission).to.have.been.called.with(testSubmission2.getId());
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("No submission exists with id");
            });
        });
        
        it("Should return an appropriate error if {id_a} is valid and {id_b} does not exist",() => {

            var testSubmission2 = new Submission("someinvalid","id");

            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',(submissionId) =>{
                if(submissionId === testSubmission2.getId()) {
                    return Promise.reject("");
                } else {
                    return Promise.resolve(testSubmission);
                }
            });

            return testSubmissionManager.compareSubmissions(testSubmission2.getId(),testSubmission.getId()).then(res => {
                expect(true,"compareSubmission is succeeding where it should fail (one id does not exist)").to.be.false;
            }).catch((err) => {
                expect(mockReadSubmission).to.have.been.called.with(testSubmission.getId());
                expect(mockReadSubmission).to.have.been.called.with(testSubmission2.getId());
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("No submission exists with id");
            });
        });

        it("Should return an appropriate error if neither submission exists",() => {
            
            var testSubmission2 = new Submission("someinvalid","id");

            var mockReadSubmission = chai.spy.on(testSubmissionDAO,'readSubmission',() =>{ return Promise.reject("No submission exists with id")});

            return testSubmissionManager.compareSubmissions(testSubmission2.getId(),testSubmission.getId()).then(res => {
                expect(true,"compareSubmission is succeeding where it should fail (one id does not exist)").to.be.false;
            }).catch((err) => {
                expect(mockReadSubmission).to.have.been.called.with(testSubmission.getId());
                expect(mockReadSubmission).to.have.been.called.with(testSubmission2.getId());
                expect(err).to.not.be.undefined;
                expect(err).to.have.property("message").which.contains("No submission exists with id");
            });
        });
    });
});
