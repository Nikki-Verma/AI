import { WorkflowStatuses } from "@/app/(authorised)/workflow/constant";
import { WorkflowStatusType } from "@/app/(authorisedHeaderLayout)/workflow/constant";
import {
  dateFormatForFrontend,
  dateTimeFormatWithMillisecondsWithoutTimeZone,
  timeFormatForFrontend,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import WorkflowKnowledgebaseCard from "../WorkflowKnowledgebaseCard";
import WorkflowModelCard from "../WorkflowModelCard";
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

export type WorkflowTagObjectType = {
  key: string;
  getValue: (val: any) => string;
};

export const WorkflowTags: WorkflowTagObjectType[] = [
  {
    key: "created_at",
    getValue: (val: any) =>
      val
        ? `${dayjs(val, dateTimeFormatWithMillisecondsWithoutTimeZone).format(dateFormatForFrontend)}  | ${dayjs(val, dateTimeFormatWithMillisecondsWithoutTimeZone).format(timeFormatForFrontend)}`
        : "",
  },
  {
    key: "pipeline_state",
    getValue: (val: WorkflowStatusType) =>
      val ? `${WorkflowStatuses?.[val]?.text || val}` : "",
  },
];
