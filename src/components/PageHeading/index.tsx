import { Typography } from "antd";
import { ReactNode } from "react";
import { PageHeadingContainer, PageSubheading } from "./style";

const { Title } = Typography;

type PageHeadingProps = {
  title: ReactNode | string;
  subHeading?: ReactNode | string | undefined;
};

const PageHeading = ({ title, subHeading }: PageHeadingProps) => {
  return (
    <PageHeadingContainer>
      <Title>{title}</Title>
      {subHeading && <PageSubheading>{subHeading}</PageSubheading>}
    </PageHeadingContainer>
  );
};

export default PageHeading;
