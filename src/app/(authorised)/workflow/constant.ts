import { WorkflowStatusType } from "@/app/(authorisedHeaderLayout)/workflow/constant";

export const WorkflowStatuses: {
  [key in WorkflowStatusType]: { text: string; color: string , border : string, background : string };
} = {
  CREATED: { text: "Draft", color: "#434343",border : '0.5px solid var(--Neutral-5, #D9D9D9)',background : '#F3F3F3' },
  MODEL_ADDED: { text: "Testing", color: "#3A1C86",border : '0.5px solid #A894DB',background : '#EBF3FF' },
  KB_ADDED: { text: "Testing", color: "#3A1C86",border : '0.5px solid #A894DB',background : '#EBF3FF' },
  KB_SKIPPED: { text: "Testing", color: "#3A1C86",border : '0.5px solid #A894DB',background : '#EBF3FF'},
  TOOL_ADDED: { text: "Testing",  color: "#3A1C86",border : '0.5px solid #A894DB',background : '#EBF3FF' },
  TOOL_SKIPED: { text: "Testing", color: "#3A1C86",border : '0.5px solid #A894DB',background : '#EBF3FF' },
  COMPLETED: { text: "Finished", color: "#004C00",border : '0.5px solid #A1B2A1',background : '#E4FFE7' },
};
