import DownIcon from "@/components/Icons/DownIcon";
import SlackIcon from "@/components/Icons/SlackIcon";
import { UnknownObject } from "@/utils/types";
import { Flex, Form, FormInstance, Tree } from "antd";
import {
  ConfluenceFilesModal,
  UploadDatasetFileContainer,
  UploadTypeDescription,
} from "./style";

type ConfluenceConfigProps = {
  form: FormInstance;
  addFilesFromConfluence: (values: UnknownObject) => void;
  changeSelectedSpaces: (values: UnknownObject) => void;
  loading: boolean;
  options: any[];
};

const ConfluenceFiles = ({
  form,
  addFilesFromConfluence,
  loading,
  options,
  changeSelectedSpaces,
}: ConfluenceConfigProps) => {
  const onCheck = (checkedKeys: any, info: any) => {
    const newCheckedNodes: any = {};

    info?.checkedNodes?.forEach((selectedPages: any) => {
      const parent = selectedPages?.parent ? selectedPages?.parent : undefined;

      if (parent) {
        newCheckedNodes[parent?.id] = [
          ...(newCheckedNodes[parent?.id] || []),
          selectedPages?.id,
        ];
      }
    });

    changeSelectedSpaces(newCheckedNodes);
  };
  return (
    <UploadDatasetFileContainer>
      <Flex align="center" justify="space-between" gap="48px">
        <UploadTypeDescription>
          We'll create a data table that can be added to any tool or agent.
          Knowledge is used to provide context to the large language model.
        </UploadTypeDescription>
        <SlackIcon />
      </Flex>

      <Form
        form={form}
        layout="vertical"
        preserve={false}
        onFinish={addFilesFromConfluence}
        disabled={loading}
      >
        <ConfluenceFilesModal
          title="Select to import"
          headStyle={{
            background: " #FAF8FF",
          }}
        >
          <Tree
            treeData={options} // Your tree data
            style={{ width: "100%" }}
            disabled={loading}
            virtual={false}
            height={400}
            checkable
            switcherIcon={
              <DownIcon
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            }
            onCheck={onCheck}
            multiple
          />
        </ConfluenceFilesModal>
      </Form>
    </UploadDatasetFileContainer>
  );
};

export default ConfluenceFiles;
