import { AnalysisResultEntry } from "./AnalysisResultEntry";

export interface IAnalysisResult {
    asJSON() : Object
    addMatch(analysisResultEntryA : AnalysisResultEntry, analysisResultEntryB : AnalysisResultEntry) : void
}

/**
 * Represents a list of matches (i.e associations) between AnalysisResultEntries, representing matches between highlighted sections
 */
export class AnalysisResult implements IAnalysisResult {
    
    private analysisMatches : Array<AnalysisResultEntry[]>; 


    constructor() {
        this.analysisMatches = [];
    }

    addMatch(analysisResultEntryA : AnalysisResultEntry, analysisResultEntryB : AnalysisResultEntry) {
        let analysisMatch = [];
        analysisMatch.push(analysisResultEntryA);
        analysisMatch.push(analysisResultEntryB);
        this.analysisMatches.push(analysisMatch);
    }

    asJSON(): Object {
        return this.analysisMatches.map((match) => {
            return [match[0].asJSON(), match[1].asJSON()];
        });
    }
}