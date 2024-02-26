import { Col, Typography } from "antd";
import { ReactNode } from "react";
import { PageSubHeading } from "../UIComponents/UIComponents.style";

const { Title } = Typography;

type PageHeadingProps = {
  title: ReactNode | string;
  subHeading?: ReactNode | string | undefined;
};

const PageHeading = ({ title, subHeading }: PageHeadingProps) => {
  return (
    <Col
      xl={14}
      lg={16}
      md={20}
      sm={24}
      xs={24}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <Title>{title}</Title>
      {subHeading && <PageSubHeading>{subHeading}</PageSubHeading>}
    </Col>
  );
};

export default PageHeading;
