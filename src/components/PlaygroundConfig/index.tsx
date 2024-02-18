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
};

const fullWidth = { width: "100%" };

const PlaygroundConfig = ({
  canLaunch = false,
  playgroundConfigDetails,
  form,
}: PlaygroundConfigProps) => {
  useEffect(() => {
    console.log(
      "🚀 ~ useEffect ~ playgroundConfigDetails?.model_paramters:",
      playgroundConfigDetails?.model_paramters,
    );
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

  console.log("form values", form.getFieldsValue());

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
              name={["model_parameters", "decay_rate"]}
              label="Decay Rate"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Decay Rate"
                precision={2}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "temperature"]}
              label="Temperature"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Temperature"
                min={0}
                max={1}
                precision={2}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "output_style"]}
              label="Output Style"
            >
              <Input placeholder="Output style" />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "chunk_size"]}
              label="Chunk size"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Chunk size"
                precision={0}
              />
            </Form.Item>
            <Form.Item
              name={["model_parameters", "token_length"]}
              label="Token length"
            >
              <InputNumber
                style={{ ...fullWidth }}
                placeholder="Token length"
                precision={2}
              />
            </Form.Item>
            <Form.Item name={["model_parameters", "sample"]} label="Sample">
              <Input placeholder="Sample" />
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
        <Form layout="vertical" form={form}>
          <ParamterCollapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => {
              console.log("🚀 ~ PlaygroundConfig ~ isActive:", isActive);
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
              <Button type="primary">Save & Launch</Button>
            </Col>
          </Row>
        </PlaygroundActionContainer>
      )}
    </PlaygroundConfigContainer>
  );
};

export default PlaygroundConfig;
