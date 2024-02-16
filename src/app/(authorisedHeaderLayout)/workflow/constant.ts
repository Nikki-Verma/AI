export enum WorkflowStatusType {
  CREATED = "CREATED",
  MODEL_ADDED = "MODEL_ADDED",
  KB_ADDED = "KB_ADDED",
  KB_SKIPPED = "KB_SKIPPED",
  TOOL_ADDED = "TOOL_ADDED",
  TOOL_SKIPED = "TOOL_SKIPED",
  COMPLETED = "COMPLETED",
}

export const WorkflowStatus = {
  CREATED: WorkflowStatusType.CREATED,
  MODEL_ADDED: WorkflowStatusType.MODEL_ADDED,
  KB_ADDED: WorkflowStatusType.KB_ADDED,
  KB_SKIPPED: WorkflowStatusType.KB_SKIPPED,
  TOOL_ADDED: WorkflowStatusType.TOOL_ADDED,
  TOOL_SKIPED: WorkflowStatusType.TOOL_SKIPED,
  COMPLETED: WorkflowStatusType.COMPLETED,
};
