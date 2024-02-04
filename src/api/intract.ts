import _unauthHttp from "@/services/_unauthHttp";
import config from "@/utils/apiEndoints";

export const initiateConversationApi = ({
  payload = {},
  headers = {},
}: any) => {
  return _unauthHttp.post(config.intract.initiateConversation, payload, {
    headers,
  });
};
