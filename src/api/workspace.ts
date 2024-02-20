import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const addModelToWorkspaceApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.workspace.addToWorkspace, payload, {
    headers,
  });
};

export const deployModelApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.workspace.deploy, payload, {
    headers,
  });
};

export const connectClosedModel = ({payload = {},headers = {}} : any) => {
  return _authHttp.post(config.workspace.connect, payload, {
    headers,
  });
}