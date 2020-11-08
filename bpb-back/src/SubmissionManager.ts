import { AnalysisResult } from './AnalysisResult';
import {ISubmission} from './Submission';
import { ISubmissionDAO } from './SubmissionDAO';
import { ISubmissionFactory } from './SubmissionFactory';

export interface ISubmissionManager {
    getSubmissions() : ISubmission[];
    createSubmission() : ISubmission;
    updateSubmission() : ISubmission;
    addFile(jsonFile : JSON) : void;
    deleteSubmission() : void;
    compareSubmission(aUID : String, bUID : String) : AnalysisResult
}

export class SubmissionManager implements ISubmissionManager {
   // submissions : ISubmission[];
    //submissionFactory : ISubmissionFactory;

    private submissionDAO : ISubmissionDAO;

    constructor(submissionDAO : ISubmissionDAO) {
        this.submissionDAO = submissionDAO;
    }

    getSubmissions(): ISubmission[] {
        throw new Error('Method not implemented.');
    }
    createSubmission(): ISubmission {
        throw new Error('Method not implemented.');
    }
    updateSubmission(): ISubmission {
        throw new Error('Method not implemented.');
    }
    addFile(jsonFile: JSON): void {
        throw new Error('Method not implemented.');
    }
    deleteSubmission(): void {
        throw new Error('Method not implemented.');
    }
    compareSubmission(aUID: String, bUID: String): AnalysisResult {
        throw new Error('Method not implemented.');
    }

}