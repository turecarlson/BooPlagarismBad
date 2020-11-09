import {IAnalysisResult} from './AnalysisResult';
import { parse, ParseTree } from 'java-ast';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

export interface ISubmissionAST {
    compare(otherSubmissionAST : ISubmissionAST) : IAnalysisResult;
    accept(visitor : AbstractParseTreeVisitor<any>) : void;
}

export class SubmissionAST implements ISubmissionAST {
    private ast : ParseTree;

    constructor(fileContent : string) {
        try {
            this.ast = parse(fileContent);
        } catch {
            throw new Error('Parser encountered an error.')
        }
    }
    compare(otherSubmissionAST: ISubmissionAST): IAnalysisResult {
        throw new Error('Method not implemented.');
    }
    accept(visitor: any): void {
        throw new Error('Method not implemented.');
    }
}


