import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const createWorkFlowApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.workflow.create, payload, {
    headers,
  });
};
