import { UnknownObject } from "@/utils/types";
import {
  Button,
  Col,
  CollapseProps,
  Flex,
  Form,
  FormInstance,
  Image as AntImage,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import Image from "next/image";
import { useEffect } from "react";
import ExpandIcon from "../Icons/ExpandIcon";
import ParameterIcon from "../Icons/ParameterIcon";
import InfoIconTooltip from "../InfoIconTooltip";
import {
  ParameterTitle,
  ParamterCollapse,
  ParamTitle,
  PlaygroundActionContainer,
  PlaygroundConfigCollapseContainer,
  PlaygroundConfigContainer,
} from "./style";

const { Text } = Typography;

type PlaygroundConfigProps = {
  canLaunch?: boolean;
  playgroundConfigDetails: {
    model_paramters: UnknownObject;
    kb_parameters: UnknownObject;
  };
  form: FormInstance;
  details: UnknownObject | null | undefined;
  changeConfigHandler: (values: UnknownObject) => void;
  savePlaygroundConfig: (values: UnknownObject) => void;
};

const fullWidth = { width: "100%" };

const PlaygroundConfig = ({
  canLaunch = false,
  playgroundConfigDetails,
  form,
  details,
  changeConfigHandler,
  savePlaygroundConfig,
}: PlaygroundConfigProps) => {
  console.log("🚀 ~ details:", details);
  console.log("🚀 ~ playgroundConfigDetails:", playgroundConfigDetails);
  useEffect(() => {
    form.setFields([
      {
        name: "model_parameters",
        value: playgroundConfigDetails?.model_paramters,
        errors: [],
      },
    ]);

    return () => {
      form.resetFields();
    };
  }, [playgroundConfigDetails]);

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: (
        <Flex gap={8} align="start">
          <ParameterIcon />
          <ParameterTitle>{`Model Parameters `}</ParameterTitle>
        </Flex>
      ),
      children: (
        <>
          <Flex gap={0} vertical>
            <Flex gap="8px" align="center">
              {details?.result?.model_detail?.weights_file_s3_url ? (
                <AntImage
                  src={details?.result?.model_detail?.weights_file_s3_url}
                  preview={false}
                  alt="model image"
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              ) : (
                <Image
                  height={24}
                  width={24}
                  src={"/assets/Images/dummyModel.png"}
                  alt="model image"
                />
              )}
              <ParamTitle>
                {details?.result?.model_detail?.model_name ?? ""}
              </ParamTitle>
            </Flex>
            <Form.Item
              name={["model_parameters", "n_predict"]}
              label={
                <Space>
                  <Text>Max tokens</Text>
                  <InfoIconTooltip title="Specifies the maximum number of tokens (words or characters) the model generates for each response. Limits output length for conciseness and focus." />
                </Space>
              }
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Max tokens"
                precision={0}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "temp"]}
              label={
                <Space>
                  <Text>Temperature</Text>
                  <InfoIconTooltip title="Controls creativity of outputs. Low values make text predictable; high values increase novelty and diversity. Example: 0.1 (very predictable) vs 1.0 (highly creative, but possibly nonsensical.)." />
                </Space>
              }
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Temperature"
                min={0}
                max={1}
                precision={1}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "top_k"]}
              label={
                <Space>
                  <Text>Top K sampling</Text>
                  <InfoIconTooltip title="Limits the model to consider only the top k predictions, enhancing relevance and coherence. Example: 0.1 (very restrictive, less diverse) vs 1.0 (more options considered, greater diversity)." />
                </Space>
              }
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Top K sampling"
                precision={0}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "repeat_penalty"]}
              label={
                <Space>
                  <Text>Repeat penalty</Text>
                  <InfoIconTooltip title="Reduces likelihood of repeating the same words or phrases. Higher values decrease repetitions, making text more diverse." />
                </Space>
              }
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Repeat penalty"
                precision={1}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "min_p"]}
              label={
                <Space>
                  <Text>Min P sampling</Text>
                  <InfoIconTooltip title="Minimum probability cutoff to consider a word for selection, filtering out less likely options. Helps balance creativity and relevance." />
                </Space>
              }
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Min P sampling"
                precision={2}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "top_p"]}
              label={
                <Space>
                  <Text>Top P sampling</Text>
                  <InfoIconTooltip title="Sets the threshold for selecting most likely words. Lower values increase focus, higher values allow more variety. Example: 0.8 (focused) vs 0.95 (varied)." />
                </Space>
              }
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Top P sampling"
                precision={2}
              />
            </Form.Item>
            {/* <Form.Item
              name={["model_detail", "model_parameters", "do_sample"]}
              label="DO sample"
            >
              <Switch />
            </Form.Item> */}
          </Flex>
        </>
      ),
      className: "",
    },
  ];

  return (
    <PlaygroundConfigContainer>
      <PlaygroundConfigCollapseContainer>
        <Form
          layout="vertical"
          form={form}
          onValuesChange={(changedValues, values) => {
            changeConfigHandler(values);
          }}
          onFinish={savePlaygroundConfig}
        >
          <ParamterCollapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => {
              return <ExpandIcon rotate={isActive ? 90 : 0} />;
            }}
            expandIconPosition="right"
            items={getItems()}
          />
        </Form>
      </PlaygroundConfigCollapseContainer>
      {canLaunch && (
        <PlaygroundActionContainer>
          <Row justify="end">
            <Col>
              <Button type="primary" onClick={form.submit}>
                Save & Launch
              </Button>
            </Col>
          </Row>
        </PlaygroundActionContainer>
      )}
    </PlaygroundConfigContainer>
  );
};

export default PlaygroundConfig;
