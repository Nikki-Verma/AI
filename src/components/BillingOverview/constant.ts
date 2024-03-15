export enum BillingHistoryType {
  CREATED = "CREATED",
  MODEL_ADDED = "MODEL_ADDED",
  KB_ADDED = "KB_ADDED",
  KB_SKIPPED = "KB_SKIPPED",
  TOOL_ADDED = "TOOL_ADDED",
  TOOL_SKIPED = "TOOL_SKIPED",
  COMPLETED = "COMPLETED",
}

export const WorkflowStatus = {
  CREATED: BillingHistoryType.CREATED,
  MODEL_ADDED: BillingHistoryType.MODEL_ADDED,
  KB_ADDED: BillingHistoryType.KB_ADDED,
  KB_SKIPPED: BillingHistoryType.KB_SKIPPED,
  TOOL_ADDED: BillingHistoryType.TOOL_ADDED,
  TOOL_SKIPED: BillingHistoryType.TOOL_SKIPED,
  COMPLETED: BillingHistoryType.COMPLETED,
};

export const BillingHistoryStatuses: {
  [key in BillingHistoryType]: {
    text: string;
    color: string;
    border: string;
    background: string;
  };
} = {
  CREATED: {
    text: "Draft",
    color: "#434343",
    border: "0.5px solid var(--Neutral-5, #D9D9D9)",
    background: "#F3F3F3",
  },
  MODEL_ADDED: {
    text: "Testing",
    color: "#3A1C86",
    border: "0.5px solid #A894DB",
    background: "#EBF3FF",
  },
  KB_ADDED: {
    text: "Testing",
    color: "#3A1C86",
    border: "0.5px solid #A894DB",
    background: "#EBF3FF",
  },
  KB_SKIPPED: {
    text: "Testing",
    color: "#3A1C86",
    border: "0.5px solid #A894DB",
    background: "#EBF3FF",
  },
  TOOL_ADDED: {
    text: "Testing",
    color: "#3A1C86",
    border: "0.5px solid #A894DB",
    background: "#EBF3FF",
  },
  TOOL_SKIPED: {
    text: "Testing",
    color: "#3A1C86",
    border: "0.5px solid #A894DB",
    background: "#EBF3FF",
  },
  COMPLETED: {
    text: "Finished",
    color: "#004C00",
    border: "0.5px solid #A1B2A1",
    background: "#E4FFE7",
  },
};
