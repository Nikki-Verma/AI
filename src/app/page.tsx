"use client";

import { AuthHoc } from "@/HOC/AuthHoc";
import useChatStream from "@/Hooks/useChatStream";

import { Button, Col, Typography } from "antd";
import Link from "next/link";
import { Container, Detail, Heading, SubHeading } from "./style";
import Image from "next/image";

const { Text } = Typography;

const Home = (props: any) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
    stopStream,
  } = useChatStream({
    options: {
      url: "http://192.168.1.95:8091/api/v1/intract/data/flux",
      method: "GET",
    },
    // This means that the user input will be sent as the body of the request with the key 'prompt' add.
    method: {
      type: "query",
      key: "prompt",
    },
  });

  return (
      <Container style={{background : `url(${process.env.NEXT_PUBLIC_BASE_URL + "/assets/Images/backgroundImg.svg"}) center repeat-x`}}>
        <Col 
        xl={5}
        lg={5}
        md={5}
        sm={24}
        xs={24}
        style={{display : 'flex',justifyContent : 'center',marginTop : '22px', alignItems : 'center',color: 'var(--Text-Color-50, #FFF)',fontFamily :'var(--font-dm-sans)',fontSize: '20px',fontWeight: 700,}}
        >
          <Image
              src="/assets/Logos/simplaiLogo.svg"
              width={27}
              height={27}
              style={{
                margin: "0px 10px",
              }}
              alt="SimplAi"
            />
         SimplAI
        </Col>
        <Col
        span={24}
        style={{display : 'flex',flexDirection : 'column',minHeight : 'calc(100vh - 50px)',alignItems : 'center',justifyContent : 'center'}}
        >
          <SubHeading>
          Something great is on the way
          </SubHeading>
          <Heading>
          Coming Soon...
          </Heading>
          <Detail>
          We are almost ready to launch! Be the first to know
          </Detail>
          {/* <Button>
            Join waitlist
          </Button> */}
        </Col>
      </Container>
  );
};

export default AuthHoc(Home);
