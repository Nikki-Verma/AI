import { UnknownObject } from "@/utils/types";
import {
  Button,
  Col,
  CollapseProps,
  Flex,
  Form,
  FormInstance,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { useEffect } from "react";
import ExpandIcon from "../Icons/ExpandIcon";
import ParameterIcon from "../Icons/ParameterIcon";
import InfoIconTooltip from "../InfoIconTooltip";
import {
  ParameterTitle,
  ParamterCollapse,
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
  changeConfigHandler: (values: UnknownObject) => void;
  savePlaygroundConfig: (values: UnknownObject) => void;
};

const fullWidth = { width: "100%" };

const PlaygroundConfig = ({
  canLaunch = false,
  playgroundConfigDetails,
  form,
  changeConfigHandler,
  savePlaygroundConfig,
}: PlaygroundConfigProps) => {
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
          <ParameterTitle>Model Parameters</ParameterTitle>
        </Flex>
      ),
      children: (
        <>
          <Flex gap={0} vertical>
            <Form.Item
              name={["model_parameters", "n_predict"]}
              label="Max tokens"
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
