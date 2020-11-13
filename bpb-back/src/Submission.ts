import { IAnalysisResult } from "./AnalysisResult";

export interface ISubmission {
    getId() : String;
    getName() : String;
    compare(otherSubmission : ISubmission) : IAnalysisResult
}

 export class Submission implements ISubmission {

    //private id : String;
    //private name : String;
   // private submissionASTs : SubmissionAST[];
    constructor(id : String, name : String){
        //TODO
    }

     getId(): String {
         throw new Error("Method not implemented.");
     }
     getName(): String {
         throw new Error("Method not implemented.");
     }
    compare(otherSubmission: ISubmission) : IAnalysisResult {
        throw new Error("Method not implemented.");
    }
}