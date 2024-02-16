import { WorkflowStatusType } from "@/app/(authorisedHeaderLayout)/workflow/constant";

export const WorkflowStatuses: {
  [key in WorkflowStatusType]: { text: string; color: string };
} = {
  CREATED: { text: "Created", color: "yellow" },
  MODEL_ADDED: { text: "Model Added", color: "blue" },
  KB_ADDED: { text: "Knowledge Base Added", color: "blue" },
  KB_SKIPPED: { text: "Knowledge Base Skipped", color: "blue" },
  TOOL_ADDED: { text: "Tool Added", color: "blue" },
  TOOL_SKIPED: { text: "Tool Skipped", color: "blue" },
  COMPLETED: { text: "Completed", color: "green" },
};
