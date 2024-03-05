import { Col } from "antd";
import { ReactNode } from "react";
import { PageSubHeading } from "../UIComponents/UIComponents.style";
import { HomePageSubHeading, WelcomeText } from "./style";


type HomePageHeadingProps = {
  title: ReactNode | string;
  subHeading?: ReactNode | string | undefined;
};

const HomePageHeading = ({ title, subHeading }: HomePageHeadingProps) => {
  return (
    <Col
      xl={14}
      lg={16}
      md={20}
      sm={24}
      xs={24}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <WelcomeText>{title}</WelcomeText>
      {subHeading && <HomePageSubHeading>{subHeading}</HomePageSubHeading>}
    </Col>
  );
};

export default HomePageHeading;
