"use client";

import { Button, Input } from "antd";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { ActionContainer, BottomControls, BottonLeftControl, BottonRightControl, ChatInputContainer } from "./style";
import AttachIcon from "../Icons/AttachIcon";
import TemplateIcon from "../Icons/TemplateIcon";
import SendIcon from "../Icons/SendIcon";

const { TextArea } = Input;

type Props = {
  submitHandler: (val: any) => void;
  handleInputChange: (val: any) => void;
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
};

function ChatInput({
  submitHandler,
  loading,
  input,
  setInput,
  handleInputChange,
}: Props) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  return (
    <ChatInputContainer>
      <TextArea
        placeholder="Type your message here..."
        disabled={!session}
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          handleInputChange(e);
        }}
        style={{resize : 'none'}}
        autoSize={{ minRows: 2, maxRows: 6 }}
        onKeyPress={(event: any) => {
          if (event.which === 13) {
            submitHandler({});
          }
        }}
      />
      <BottomControls>
          <BottonLeftControl>
            <ActionContainer>
              <AttachIcon />
              Attach
            </ActionContainer>
            <ActionContainer>
              <TemplateIcon/>
              Browse templates
            </ActionContainer>
          </BottonLeftControl>
          <BottonRightControl>
            <div style={{color : 'var(--Text-Color-800, #2E2E2E)',fontSize : '12px'}}>
            0/1000
            </div>
            <SendIcon onClick = {()=>submitHandler({})} style = {{cursor : 'pointer'}}/>
          </BottonRightControl>
      </BottomControls>
    </ChatInputContainer>
  );
}

export default ChatInput;
