import { Col, Row, Tag } from "antd";
import MarkdownComponent from "../Markdown";

import { Container, Heading } from "./style";
const ModelOverView = ({ overviewDetails }: any) => {
  return (
    <Container>
      <Row gutter={[12, 12]}>
        <Col span={16} style={{ padding: "20px", overflow: "hidden" }}>
          {overviewDetails && <MarkdownComponent markdown={overviewDetails} />}
        </Col>
        <Col
          span={8}
          style={{
            borderLeft: "1px solid var(--Text-Color-150, #D5D5D5)",
            background: "#FFF",
            boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.10)",
            padding: "20px",
          }}
        >
          <Heading>Model requirements</Heading>
          <ul>
            <li>CPU</li>
            <li>GPU</li>
            <li>RAM</li>
            <li>Storage</li>
          </ul>
          <Heading>Usages cost</Heading>
          <ul>
            <li>$0.01 per job</li>
          </ul>
          <Heading>Language Support</Heading>
          <ul>
            <li>Single Language Support: English, French, German etc</li>
            <li>
              Multilingual: (English, French), (English, Hinglish, Hindi), etc
            </li>
          </ul>
          <Heading>Tags</Heading>
          <Row gutter={[0, 10]}>
            <Tag>Sample tag 1</Tag>
            <Tag>Sample tag 2</Tag>
            <Tag>Sample tag 3</Tag>
            <Tag>Sample tag 4</Tag>
            <Tag>Sample tag 5</Tag>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ModelOverView;
