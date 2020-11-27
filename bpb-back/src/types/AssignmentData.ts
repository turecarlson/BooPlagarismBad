
/**
 * Represents Assignment data passed between the Router and Manager
 * Used to create and update assignments
 */
type AssignmentData = {
    name: string,
    submissionIds: string[]
}

export default AssignmentData; 