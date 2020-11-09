import {IAnalysisResult} from './AnalysisResult';

export interface ISubmissionAST {
    compare(otherSubmissionAST : ISubmissionAST) : IAnalysisResult
    add(submissionAST : ISubmissionAST) : void
    remove(submissionAST : ISubmissionAST) : void
    getChild(submissionAST : ISubmissionAST) : void
    getValue() : String
}
