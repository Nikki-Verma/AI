import DocumentIcon from "@/components/Icons/DocumentIcon";
import DocumentPrivacyIcon from "@/components/Icons/DocumentPrivacy";
import RemoveIcon from "@/components/Icons/RemoveIcon";
import {
  UploadSubTextContainer,
  UploadTextContainer,
} from "@/components/UploadTraingingData/style";
import { formatSizeUnits } from "@/utils/helperFunction";

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
  maxCount = undefined,
  multiple = true,
  accept = "",
  loading = false,
}: any) => {
  const uploadProps = {
    name: "dataset_files",
    disabled: loading,
    itemRender: (originalNode: any, file: any) => {
      return (
        <FileListItem key={file?.uid}>
          <FileItemDetails>
            <DocumentIcon />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FileName>{file?.name}</FileName>
              <FileSize>
                {file?.size ? `${formatSizeUnits(file?.size)}` : ""}
              </FileSize>
            </div>
          </FileItemDetails>
          <RemoveIcon
            style={{ cursor: loading ? "no-drop" : "pointer" }}
            onClick={() => {
              if (loading) {
                return null;
              }
              const index = fileList.findIndex(
                (singleFile: any) => singleFile?.uid === file?.uid,
              );

              if (index != -1) {
                const newFileList = fileList.slice();

                newFileList.splice(index, 1);

                setFileList([...newFileList]);
                form.setFields([
                  {
                    name: "dataset_files",
                    value: [...newFileList],
                    errors: [],
                  },
                ]);
              }
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
    onChange: (files: any) => {
      if (maxCount) {
        if (files?.fileList?.length > maxCount) {
          const newFiles = files?.fileList?.slice(maxCount - 1);
          setFileList([...newFiles]);
          return null;
        }
        setFileList(fileList);
      } else {
        setFileList([...files?.fileList]);
      }
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
                    Drop and Drag your files here or Browse
                  </UploadTextContainer>
                  <UploadSubTextContainer>
                    Supported formats: .html, .txt, .docx & .pdf
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
