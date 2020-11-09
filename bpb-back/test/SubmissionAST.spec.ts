import { ISubmissionAST, SubmissionAST } from "../src/SubmissionAST";
import { AnalysisResult } from "../src/AnalysisResult"
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import chaiSpies = require('chai-spies');
import chai = require('chai');
import fs from 'fs';
import { expect } from "chai";
import SubmissionASTVisitor from "../src/SubmissionASTVisitor";

describe('SubmissionAST.ts', () => {
    var testSubmissionAST : ISubmissionAST;

    before(() => {
        chai.use(chaiSpies);
    });

    beforeEach(() => {
        let exampleFileContent = fs.readFileSync('./test/data/testJava.java').toString();
        testSubmissionAST = new SubmissionAST(exampleFileContent);
    });

    it('Should construct a SubmissionAST object successfully when passed a string representing a java file.', () => {
        let exampleFileContent = fs.readFileSync('./test/data/testJava.java').toString();
        let newSubmissionAST = new SubmissionAST(exampleFileContent);
        expect(newSubmissionAST).to.be.an.instanceof(SubmissionAST);
    });

    it('Should throw an Error if parse() fails in the constructor.', () => {
        let exampleFileContent = fs.readFileSync('./test/data/testNOTJava.java').toString();
        expect(new SubmissionAST(exampleFileContent)).to.throw('Parser encountered an error.')
    });

    it('Should receive an AnalysisResult object when compare(other : SubmissionAST) is invoked.', () => {
        let secondaryAST = new SubmissionAST(fs.readFileSync('./test/data/testJava.java').toString());
        let result = testSubmissionAST.compare(secondaryAST);
        expect(result).to.be.an.instanceof(AnalysisResult);
    });

    it('Should accept a visitor when accept(visitor : AbstractParseTreeVisitor) is invoked.', () => {
        let visitor = new SubmissionASTVisitor();
        var acceptSpy = chai.spy.on(testSubmissionAST, 'accept');
        expect(acceptSpy).to.have.been.called;
    });
});