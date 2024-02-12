import DocumentIcon from "@/components/Icons/DocumentIcon";
import DocumentPrivacyIcon from "@/components/Icons/DocumentPrivacy";
import RemoveIcon from "@/components/Icons/RemoveIcon";
import {
  UploadSubTextContainer,
  UploadTextContainer,
} from "@/components/UploadTraingingData/style";

import { Form } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Image from "next/image";
import {
  FileItemDetails,
  FileListItem,
  FileName,
  FileSize,
  PrivacyDescription,
  PrivacyTitle,
  UploadDatasetFileContainer,
  UploadPrivacyContainer,
} from "./style";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UploadManualFile = ({
  form,
  fileList,
  setFileList,
  addFilesHandler,
  maxCount = 2,
  multiple = true,
  accept = ".csv",
  preview = false,
}: any) => {
  const uploadProps = {
    name: "dataset_files",
    itemRender: (originalNode: any, file: any) => {
      return (
        <FileListItem>
          <FileItemDetails>
            <DocumentIcon />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FileName>{file?.name}</FileName>
              <FileSize>{file?.size ? `${file?.size} bytes` : ""}</FileSize>
            </div>
          </FileItemDetails>
          <RemoveIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
          />
        </FileListItem>
      );
    },
    multiple: multiple,
    accept: accept,
    maxCount: maxCount,
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      if (fileList?.length < maxCount) {
        setFileList([...fileList, file]);
      }

      if (fileList?.length === maxCount) {
        const index = fileList.findIndex(
          (data: any) => data.name === file.name,
        );

        if (index === -1) {
          fileList.shift();
          fileList.push(file);
        } else {
          fileList[index] = file;
        }
        setFileList(fileList);
      }

      return false;
    },
    fileList,
  };

  return (
    <UploadDatasetFileContainer>
      <Form
        form={form}
        layout="vertical"
        preserve={false}
        onFinish={addFilesHandler}
      >
        <Form.Item
          name="dataset_files"
          label="Upload your files"
          rules={[
            {
              required: true,
              message: "Dataset file is required",
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Dragger {...uploadProps}>
            {
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Image
                  width={44}
                  height={44}
                  src={"/assets/Images/uploadImg.svg"}
                  alt="uploader"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <UploadTextContainer>
                    Drop and Drag your files here or Browse (uplaod only .text
                    or .pdf format)
                  </UploadTextContainer>
                  <UploadSubTextContainer>
                    Supported formats: .text & .pdf
                  </UploadSubTextContainer>
                </div>
              </div>
            }
          </Dragger>
          {/* <SAUpload uploadProps={uploadProps} fileList={fileList} /> */}
        </Form.Item>
      </Form>
      <UploadPrivacyContainer>
        <DocumentPrivacyIcon />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <PrivacyTitle>Your data privacy matters</PrivacyTitle>
          <PrivacyDescription>
            Simplai processes all files independently, without relying on
            third-party involvement. Read more
          </PrivacyDescription>
        </div>
      </UploadPrivacyContainer>
    </UploadDatasetFileContainer>
  );
};

export default UploadManualFile;
