import {
  Button,
  Col,
  CollapseProps,
  Flex,
  Form,
  InputNumber,
  Row,
  Typography,
} from "antd";
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
};

const fullwidth = { width: "100%" };

const PlaygroundConfig = ({ canLaunch = true }: PlaygroundConfigProps) => {
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
              name={["model_paramters", "token_length"]}
              label="Token length"
            >
              <InputNumber
                placeholder="Token length"
                style={{ ...fullwidth }}
              />
            </Form.Item>
            <Form.Item
              name={["model_paramters", "temperature"]}
              label="Temperature"
            >
              <InputNumber placeholder="Temperature" style={{ ...fullwidth }} />
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
        <Form layout="vertical">
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
              <Button type="primary"> Launch</Button>
            </Col>
          </Row>
        </PlaygroundActionContainer>
      )}
    </PlaygroundConfigContainer>
  );
};

export default PlaygroundConfig;
