import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const initiateConversationApi = ({
  payload = {},
  headers = {},
}: any) => {
  return _authHttp.post(config.intract.initiateConversation, payload, {
    headers,
  });
};
