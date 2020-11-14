import {AnalysisResultEntry} from "../AnalysisResultEntry";
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
//TODO: bring in the new TLSH library found at https://github.com/trendmicro/tlsh/blob/master/js_ext/tlsh.js

interface IAnalysisResultEntryCollectorVisitor {
    getAnalysisResultEntries(): AnalysisResultEntry[]    
}

//TODO: Add extension of AbstractParseTreeVisitor (including actual visit methods, etc)
class AnalysisResultEntryCollectorVisitor implements IAnalysisResultEntryCollectorVisitor{
    
    constructor(filePath : String) {
        //TODO: filePath is the path to the file being processed. Don't need to retrieve contents again (done externally) - this is for inclusion in AnalysisResultEntry metadata
    }
    getAnalysisResultEntries() : AnalysisResultEntry[] {
        return [] //TODO
    }
}