import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const inviteUserApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.identity.signup, payload, {
    headers,
  });
};

export const changeStatusApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.identity.changeStatus, payload, {
    headers,
  });
};
