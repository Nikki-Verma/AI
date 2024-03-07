import JSEncrypt from "jsencrypt";
import _authHttp from "../services/_http";
import _unauthHttp from "../services/_unauthHttp";
import config, { BASE_URLS } from "./apiEndoints";
import { UnknownObject } from "./types";

export const generateEncryptedPassword = async (data: any) => {
  const encrypt = new JSEncrypt();
  try {
    const generatPassword: any = await _unauthHttp.get(
      `${BASE_URLS.identity}/util/public_key`,
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
  defaultMessage = "Something went wrong!",
) => {
  if (typeof res === "string") {
    return res;
  }
  if (res?.response) {
    const error =
      res?.response?.data?.detail &&
      typeof res?.response?.data?.detail === "string"
        ? res?.response?.data?.detail
        : res?.response?.data?.detail?.[0]?.msg &&
            typeof res?.response?.data?.detail?.[0]?.msg === "string"
          ? res?.response?.data?.detail?.[0]?.msg
          : res?.response?.data?.message
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

export const getFilters = (filters: any) => {
  const filtersObj: any = {};
  Object.entries(filters).forEach(([key, value]: any) => {
    filtersObj[key] = value?.[0];
  });
  return filtersObj;
};

// Find a way to use the meta deta content and normal content
// export const getHtmlFromMarkdown = async (content: string) => {
//   const matterResult = matter(content);

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content);
//   const contentHtml = processedContent.toString();
//   return contentHtml;
// };

export const uploadDatasetFiles = async (
  file: string | Blob,
  doc_details: UnknownObject,
) => {
  let resolve: any, reject: any;
  const promise: any = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const formData = new FormData();

  formData.set("file", file);
  formData.set("document_detail", JSON.stringify(doc_details));
  const Headers: any = {
    "Content-Type": "multipart/form-data",
  };

  try {
    let res = await _authHttp.post(config.dataset.uploadFile, formData, {
      headers: { ...Headers },
    });
    if (res?.data?.ok) {
      resolve(res?.data?.result);
    } else {
      const err = getErrorFromApi(res);
      reject(getErrorFromApi(res));
    }
  } catch (e) {
    reject(getErrorFromApi(e));
  }
  return promise;
};

export const userCredentialsFromName = (name: string) => {
  return (
    name
      ?.split(" ")
      ?.map((splittedName: string) => splittedName?.[0] || "")
      ?.filter((char: string) => !!char)
      .join("") || "You"
  );
};

export const formatSizeUnits = (val: any) => {
  if (val >= 1073741824) {
    val = (val / 1073741824).toFixed(2) + " GB";
  } else if (val >= 1048576) {
    val = (val / 1048576).toFixed(2) + " MB";
  } else if (val >= 1024) {
    val = (val / 1024).toFixed(2) + " KB";
  } else if (val > 1) {
    val = val + " bytes";
  } else if (val == 1) {
    val = val + " byte";
  } else {
    val = "0 bytes";
  }
  return val;
};
