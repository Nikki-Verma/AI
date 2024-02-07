"use client";

import { Typography } from "antd";
import Image from "next/image";
import { IconContainer, MessageContainer, PromptContainer } from "./style";

const { Paragraph } = Typography;

type Props = {
  message: any;
  loading: boolean;
};

function Message({ message, loading }: Props) {
  const isUser = message?.role === "user";

  return (
    <MessageContainer role={message?.role}>
      {isUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: "#000",
              opacity: "0.6",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            You
          </span>
          <IconContainer>RS</IconContainer>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_BASE_URL + "/assets/Logos/simplaiLogo.svg"
            }
            height={25}
            width={25}
            alt=""
          />
          <span
            style={{
              color: "#000",
              opacity: "0.6",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            SimplAI.ai
          </span>
        </div>
      )}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "2px",
          }}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              "/assets/Images/chatLoading.gif"
            }
            alt="loading"
            width={40}
            height={28}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Generating answers for you...
          </span>
        </div>
      ) : (
        <PromptContainer role={message?.role}>
          <span>
            {message?.content
              ? message?.content
                  ?.split?.("\n")
                  ?.map((singleLineText: any) => {
                    if (singleLineText)
                      return <Paragraph>{singleLineText}</Paragraph>;
                    return null;
                  })
                  ?.filter((text: any) => !!text)
              : ""}
          </span>
        </PromptContainer>
      )}
    </MessageContainer>
  );
}

export default Message;
