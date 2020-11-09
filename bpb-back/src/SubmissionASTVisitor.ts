import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

export default class SubmissionASTVisitor<T> extends AbstractParseTreeVisitor<T> {
    protected defaultResult(): T {
        throw new Error('Method not implemented.');
    }
    constructor() {
      super();
    }
}  