import { UnknownObject } from "@/utils/types";
import {
  Button,
  Col,
  CollapseProps,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import { useEffect } from "react";
import ExpandIcon from "../Icons/ExpandIcon";
import ParameterIcon from "../Icons/ParameterIcon";
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
              label="Tokens to generate"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Tokens to generate"
                precision={0}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "temp"]}
              label="Temperature"
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
              label="Top K sampling"
            >
              <InputNumber
              style={{...fullWidth}}
              placeholder="Top K sampling" 
              precision = {0}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "repeat_penalty"]}
              label="Repeat penalty"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Repeat penalty"
                precision={1}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "min_p"]}
              label="Min P sampling"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Min P sampling"
                precision={2}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "top_p"]}
              label="Top P sampling"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Top P sampling"
                precision={2}
              />
            </Form.Item>
            <Form.Item 
            name={["model_parameters", "n_threads"]} 
            label="CPU threads"
            >
              <InputNumber 
              style={{...fullWidth}}
              placeholder="CPU threads"
               />
            </Form.Item>
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
