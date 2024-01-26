import JSEncrypt from "jsencrypt";
import _unauthHttp from "../services/_unauthHttp";
import { BASE_URLS } from "./apiEndoints";

export const generateEncryptedPassword = async (data: any) => {
  const encrypt = new JSEncrypt();
  try {
    const generatPassword: any = await _unauthHttp.get(
      `${BASE_URLS.identity}/util/public_key`
    );
    encrypt.setPublicKey(generatPassword?.data?.result);
    var encryptedPass = encrypt.encrypt(data.replace(/^"(.*)"$/, "$1"));
    return encryptedPass;
  } catch (error) {
    console.error({ message: `${getErrorFromApi(error)}` });
  }
};

export const getErrorFromApi = (
  res: any,
  defaultMessage = "Something went wrong!"
) => {
  if (typeof res === "string") {
    return res;
  }
  if (res?.response) {
    const error = res?.response?.data?.message
      ? res?.response?.data?.message
      : res?.response?.data?.error?.message;
    if (error) return error;
  }

  if (res?.data) {
    const error = res?.data?.error?.message;
    if (error) return error;
  }
  return res?.message || defaultMessage;
};
