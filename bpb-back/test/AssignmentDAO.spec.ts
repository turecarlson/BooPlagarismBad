import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import {IAssignment, Assignment} from '../src/model/Assignment'
import { AssignmentDAO } from '../src/model/AssignmentDAO'

describe("AssignmentDAO.ts",() => {

    var testAssignment : IAssignment;
    var testAssignmentName : string;
    var testAssignmentSubmissionIds : string[];

    before((done) => {
        chai.use(chaiAsPromised);
        testAssignmentName =  "Prof. Sophira's CS6666 Assignment of Pointless Extremity";
        testAssignmentSubmissionIds =  ["5fc2a8b18636ab0ada9a21bb","5fbd82f618333b41055c1dff"];

        //TODO: Replace this (and beforeEach) with database mock (or something more elegant)
        //This is really fragile!
        mongoose.connect("mongodb://127.0.0.1:27017/bpbtest", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
            done();
        });
    });

    beforeEach((done)=>{

        //Restore global prototype mocks
        chai.spy.restore(Assignment.getStaticModel());

        mongoose.connection.collections.submissions.drop(() => {
            var testAssignmentBuilder = new Assignment.builder();
            testAssignmentBuilder.setName(testAssignmentName);
            testAssignmentBuilder.setSubmissionIds(testAssignmentSubmissionIds);
            testAssignment = testAssignmentBuilder.build();
            done();
        });
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });

    describe("createAssignment()",() => {
        it("Should create an assignment database object if inputs are valid",() => {
            return AssignmentDAO.createAssignment(testAssignment.getName(), testAssignment.getSubmissionIds()).then((assignment) => {
                
                expect(assignment.getName()).to.equal(testAssignment.getName());
                expect(assignment.getId()).to.not.be.undefined;

                return Assignment.getStaticModel().findOne({"name":testAssignment.getName()}).then((document) => {
                    expect(document).to.have.property("name").which.equals(testAssignment.getName());
                    expect(document.id).to.equal(testAssignment.getId());
                });
            }); 
        });

        it("Should throw an appropriate error if saving fails during creation",() => {
            chai.spy.on(Assignment.getStaticModel().prototype,'save',() => {return Promise.reject(new Error("Cannot save"))});

            return expect(AssignmentDAO.createAssignment(testAssignment.getName(),testAssignment.getSubmissionIds())).to.eventually.be.rejectedWith("Cannot save");
        });
    });

    describe("readAssignment()",() => {
        it("Should read an assignment database object if {id} is valid",() => {
            return AssignmentDAO.createAssignment(testAssignment.getName(), testAssignment.getSubmissionIds()).then((assignment) => {
                return AssignmentDAO.readAssignment(assignment.getId()).then((readAssignment) => {
                    expect(readAssignment.getName()).to.equal(assignment.getName());
                    expect(readAssignment.getId()).to.equal(assignment.getId());
                });
            });
        });

        it("Should throw an appropriate error when trying to read a nonexistent assignment",() => {
            var nonPersistedAssignment = new Assignment.builder().build(); 
            return expect(AssignmentDAO.readAssignment(nonPersistedAssignment.getId())).to.eventually.be.rejectedWith("Cannot find: No assignment with the given id exists in the database");
        });

        it("Should throw an appropriate error if assignment can't be found during read",() => {
            chai.spy.on(Assignment.getStaticModel(),'findOne',() => { return Promise.reject(new Error("Cannot findOne"))});
            return expect(AssignmentDAO.readAssignment(testAssignment.getId())).to.eventually.be.rejectedWith("Cannot findOne");
        });
    });
    
    describe("readAssignments",() => {
        it("should return an empty array of assignments if no assignments exist in the database",() => {
            return AssignmentDAO.readAssignments().then(submissions => {
                expect(submissions).to.deep.equal([]);
            });
        });

        it("should return all assignments if at least one assignment exists in the database", () => {
            var testAssignment2 = new Assignment.builder().build();

            return AssignmentDAO.createAssignment(testAssignment.getName(),testAssignment.getSubmissionIds()).then((createdAssignment)  => {
                return AssignmentDAO.createAssignment(testAssignment2.getName(),testAssignment2.getSubmissionIds()).then((createdAssignment2) => {
                    return AssignmentDAO.readAssignments().then((assignments) => {
                        expect(assignments[0].getId()).to.equal(createdAssignment.getId());
                        expect(assignments[0].getName()).to.equal(createdAssignment.getName());
                        expect(assignments[0].getSubmissionIds()).to.equal(createdAssignment.getSubmissionIds());

                        expect(assignments[1].getId()).to.equal(createdAssignment2.getId());
                        expect(assignments[1].getName()).to.equal(createdAssignment2.getName());
                        expect(assignments[1].getSubmissionIds()).to.equal(createdAssignment2.getSubmissionIds());
                    });
                });
            });
        });

        it("Should throw an appropriate error if database find fails during read",() => {
            chai.spy.on(Assignment.getStaticModel(),'find',() => { return Promise.reject(new Error("Cannot find"))});
            return expect(AssignmentDAO.readAssignments()).to.eventually.be.rejectedWith("Cannot find"); 
        });
        it("Should throw an appropriate error if returned assignments can't be built (can't map model results)",() => {
            chai.spy.on(Assignment.getStaticModel(),'find',() => { return Promise.resolve([{}])});
            return expect(AssignmentDAO.readAssignments()).to.eventually.be.rejectedWith("At least one required model property is not present on the provided model");
        });
    });
        
    describe("updateAssignment()",() => {
        it("Should update an assignment database object if {id} is valid");

        it("Should throw an appropriate error if no assignment exists with the specified {id}",() =>  {
            var newAssignment = new Assignment.builder().build();
            return AssignmentDAO.updateAssignment(newAssignment).then(updatedAssignment => {
                expect(true,"updateAssignment should have failed, but it succeeded").to.equal(false);
            }).catch((err) =>{
                expect(err).to.have.property("message").which.contains("Cannot update: No assignment with the given id exists in the database");
            });
        });

        it("Should throw an appropriate error if database findOne fails during update",() => {
            chai.spy.on(Assignment.getStaticModel(),'findOne',() => { return Promise.reject(new Error("Cannot findOne"))});
            return expect(AssignmentDAO.updateAssignment(testAssignment)).to.eventually.be.rejectedWith("Cannot findOne");
        });

        it("Should throw an appropriate error if database findOneAndUpdate fails during update",()  => {
            chai.spy.on(Assignment.getStaticModel(),'findOneAndUpdate',() => { return Promise.reject(new Error("Cannot findOneAndUpdate"))});
            
            return AssignmentDAO.createAssignment(testAssignment.getName(), testAssignment.getSubmissionIds()).then((createdAssignment) => {
                return expect(AssignmentDAO.updateAssignment(createdAssignment)).to.eventually.be.rejectedWith("Cannot findOneAndUpdate");
            });
        });
    });

    describe("deleteAssignment()",() => {
        it("Should be able to delete an assignment database object",() => {

            return AssignmentDAO.createAssignment(testAssignment.getName(), testAssignment.getSubmissionIds()).then((createdAssignment) => {

                return Assignment.getStaticModel().findOne({_id:createdAssignment.getId()}).then((firstFindRes) => {  

                    expect(firstFindRes).to.have.property("name").which.equals(testAssignment.getName());

                    return AssignmentDAO.deleteAssignment(createdAssignment.getId()).then((deleteRes) => {
                        
                        return Assignment.getStaticModel().findOne({_id:createdAssignment.getId()}).then((secondFindRes) => {
                            expect(secondFindRes).to.be.null;
                        });                     
                    });
                });
            });
        });

        it("Should throw an appropriate error if {id} is invalid",() => {
            var newAssignment= new Assignment.builder().build();
            return expect(AssignmentDAO.deleteAssignment(newAssignment.getId())).to.eventually.be.rejectedWith("Cannot delete: No assignment with the given id exists in the database");
        });

        it("Should throw an appropriate error if database findOne fails during deletion",() => {
            chai.spy.on(Assignment.getStaticModel(),'findOne',() => { return Promise.reject(new Error("Cannot findOne"))});
            return expect(AssignmentDAO.deleteAssignment(testAssignment.getId())).to.eventually.be.rejectedWith("Cannot findOne");
        });

        it("Should throw an appropriate error if database findOneAndDelete fails during deletion",() => {
            chai.spy.on(Assignment.getStaticModel(),'findOneAndDelete',() => { return Promise.reject(new Error("Cannot findOneAndDelete"))});
            
            return AssignmentDAO.createAssignment(testAssignment.getName(), testAssignment.getSubmissionIds()).then((createdAssignment) => {
                return expect(AssignmentDAO.deleteAssignment(createdAssignment.getId())).to.eventually.be.rejectedWith("Cannot findOneAndDelete");
            });
        });
    });
});