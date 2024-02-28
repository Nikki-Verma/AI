export enum AgentStatusType {
    CREATED = "CREATED",
    MODEL_ADDED = "MODEL_ADDED",
    KB_ADDED = "KB_ADDED",
    KB_SKIPPED = "KB_SKIPPED",
    TOOL_ADDED = "TOOL_ADDED",
    TOOL_SKIPED = "TOOL_SKIPED",
    COMPLETED = "COMPLETED",
  }
  
  export const AgentStatus = {
    CREATED: AgentStatusType.CREATED,
    MODEL_ADDED: AgentStatusType.MODEL_ADDED,
    KB_ADDED: AgentStatusType.KB_ADDED,
    KB_SKIPPED: AgentStatusType.KB_SKIPPED,
    TOOL_ADDED: AgentStatusType.TOOL_ADDED,
    TOOL_SKIPED: AgentStatusType.TOOL_SKIPED,
    COMPLETED: AgentStatusType.COMPLETED,
  };
  