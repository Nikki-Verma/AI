"use client";

import { Input } from "antd";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import SendIcon from "../Icons/SendIcon";
import {
  BottomControls,
  BottonLeftControl,
  BottonRightControl,
  ChatInputContainer,
  RightControls,
} from "./style";

const { TextArea } = Input;

type Props = {
  submitHandler: (val: any) => void;
  handleInputChange: (val: any) => void;
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  stopStream: () => void;
};

function ChatInput({
  submitHandler,
  loading,
  input,
  setInput,
  handleInputChange,
  stopStream,
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
        style={{ resize: "none" }}
        autoSize={{ minRows: 1, maxRows: 6 }}
        onKeyPress={(event: any) => {
          if (event.which === 13) {
            event.preventDefault();
            submitHandler({});
          }
        }}
      />
      <RightControls>
        <SendIcon
          onClick={() => submitHandler({})}
          style={{ cursor: "pointer" }}
        />
      </RightControls>
      {/* <BottomControls>
        <BottonLeftControl>
          <ActionContainer>
            <AttachIcon />
            Attach
          </ActionContainer>
          <ActionContainer>
            <TemplateIcon />
            Browse templates
          </ActionContainer>
        </BottonLeftControl>
        <BottonRightControl>
          <div
            style={{
              color: "var(--Text-Color-800, #2E2E2E)",
              fontSize: "12px",
            }}
          >
            {input?.length}
          </div>
          <SendIcon
            onClick={() => submitHandler({})}
            style={{ cursor: "pointer" }}
          />
        </BottonRightControl>
      </BottomControls> */}
    </ChatInputContainer>
  );
}

export default ChatInput;
