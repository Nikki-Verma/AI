"use client";

import { Typography } from "antd";
import useToken from "antd/es/theme/useToken";
import Image from "next/image";
import { BetaTag, BetaTagTitle, PageHeader } from "./style";
const { Text, Title } = Typography;
const TopbarHeading = () => {
  const [theme, token] = useToken();

  return (
    <PageHeader>
      <Image
        src="/assets/Logos/simplaiLogo.svg"
        width={32}
        height={32}
        alt="SimplAI"
      />
      <Title level={4} style={{ color: token.colorPrimary, margin: 0 }}>
        SimplAI
      </Title>
      <BetaTag>
        <BetaTagTitle>Beta</BetaTagTitle>
      </BetaTag>
    </PageHeader>
  );
};

export default TopbarHeading;
