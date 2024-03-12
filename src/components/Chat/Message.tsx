"use client";

import { handleCopy, userCredentialsFromName } from "@/utils/helperFunction";
import { Tooltip, Typography } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ChatLoadingIcon from "../Icons/ChatLoadingIcon";
import MarkdownComponent from "../Markdown";
import { IconContainer, MessageContainer, PromptContainer } from "./style";
import { FlexEndContainer } from "../UIComponents/UIComponents.style";
import { CopyOutlined,CheckOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Paragraph } = Typography;

type Props = {
  message: any;
  loading: boolean;
};

function Message({ message, loading }: Props) {
  const isUser = message?.role === "user";
  const { data: session, status }: any = useSession();
  const[showCopied, setShowCopied]= useState<boolean>(false)

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
          {/* <span
            style={{
              color: "#000",
              opacity: "0.6",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            You
          </span> */}
          <IconContainer>
            {userCredentialsFromName(session?.user?.details?.name)}
          </IconContainer>
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
            src={"/assets/Logos/simplaiLogo.svg"}
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
            SimplAI
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
          <ChatLoadingIcon />
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
            {message?.content ? (
              <>
                <MarkdownComponent markdown={message?.content} />
              </>
            ) : (
              ""
            )}
          </span>
          {message?.role === "SimplAi" &&
          <FlexEndContainer style={{width : '100%'}}>
            {showCopied ? 
            <Tooltip title = 'Copied' placement="top">
            <CheckOutlined />
            </Tooltip>
            :
            <Tooltip title = 'Copy' placement="top">
            <CopyOutlined 
            onClick={()=>{
              handleCopy(message?.content)
              setShowCopied(true)
              setTimeout(() => {
                setShowCopied(false)
              }, 700);
            }} 
            style={{cursor : 'pointer'}} />
            </Tooltip>
            }
          </FlexEndContainer>
          }
        </PromptContainer>
      )}
    </MessageContainer>
  );
}

export default Message;
