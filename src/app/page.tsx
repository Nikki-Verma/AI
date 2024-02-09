"use client";

import { AuthHoc } from "@/HOC/AuthHoc";

import { Page_Type } from "@/utils/constants";
import { Col, Typography } from "antd";
import Image from "next/image";
import { Container, Detail, Heading, SubHeading } from "./style";

const { Text } = Typography;

const Home = (props: any) => {
  return (
    <Container
      style={{
        background: `url(/assets/Images/backgroundImg.svg) center`,
      }}
    >
      <Col
        xl={5}
        lg={5}
        md={5}
        sm={24}
        xs={24}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "22px",
          alignItems: "center",
          color: "var(--Text-Color-50, #FFF)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        <Image
          src="/assets/Logos/simplaiLogo.svg"
          width={27}
          height={27}
          style={{
            margin: "0px 10px",
          }}
          alt="SimplAI"
        />
        SimplAI
      </Col>
      <Col
        span={24}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 50px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SubHeading>Something great is on the way</SubHeading>
        <Heading>Coming Soon...</Heading>
        <Detail>We are almost ready to launch! Be the first to know</Detail>
        {/* <Button>
            Join waitlist
          </Button> */}
      </Col>
    </Container>
  );
};

export default AuthHoc(Home, Page_Type.unauth);
