import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const createAgentApi = ({ payload = {}, headers = {} }: any) => {
    return _authHttp.post(config.agents.create, payload, {
      headers,
    });
  };
  
export const updateAgentApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.put(config.agents.update, payload, { headers });
};
  