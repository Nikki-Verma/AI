import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const integrateChannelApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.integrate.create, payload, {
    headers,
  });
};
