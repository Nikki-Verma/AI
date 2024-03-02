import {
  dateFormatForFrontend,
  dateTimeFormatWithMillisecondsWithoutTimeZone,
  timeFormatForFrontend,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import WorkflowKnowledgebaseCard from "../WorkflowKnowledgebaseCard";
import WorkflowModelCard from "../WorkflowModelCard";
import { AgentStatusType } from "@/app/(authorisedHeaderLayout)/agents/constants";
import { AgentStatuses } from "@/app/(authorised)/agents/constants";
export const items = (data: any) => [
  {
    key: "model_details",
    label: "Model Details",
    children: <WorkflowModelCard modelDetails={data?.result?.model_detail} />,
  },
  {
    key: "kb_details",
    label: "Knowledge Base Details",
    children: <WorkflowKnowledgebaseCard kbDetails={data?.result?.kb} />,
  },
  {
    key: "integrations",
    label: "Integrations",
    children: <div>Under Development</div>,
  },
];

export type AgentTagObjectType = {
  key: string;
  getValue: (val: any) => string;
};

export const AgentTags: AgentTagObjectType[] = [
  {
    key: "created_at",
    getValue: (val: any) =>
      val
        ? `${dayjs(val, dateTimeFormatWithMillisecondsWithoutTimeZone).format(dateFormatForFrontend)}  | ${dayjs(val, dateTimeFormatWithMillisecondsWithoutTimeZone).format(timeFormatForFrontend)}`
        : "",
  },
  {
    key: "agent_state",
    getValue: (val: AgentStatusType) =>
      val ? `${AgentStatuses?.[val]?.text || val}` : "",
  },
];
