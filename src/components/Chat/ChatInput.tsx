"use client";

import { Button, Input } from "antd";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";

const { TextArea } = Input;

type Props = {
  chatId: string;
  submitHandler: (val: any) => void;
  handleInputChange: (val: any) => void;
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
};

function ChatInput({
  chatId,
  submitHandler,
  loading,
  input,
  setInput,
  handleInputChange,
}: Props) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <TextArea
        placeholder="Type your message here..."
        disabled={!session}
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          handleInputChange(e);
        }}
        className={`bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 ${
          !loading && "animate-pulse"
        }`}
        onKeyPress={(event: any) => {
          if (event.which === 13) {
            submitHandler({});
          }
        }}
      />

      {loading ? (
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 -rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      ) : (
        <Button onClick={submitHandler} disabled={!session}>
          Submit
        </Button>
      )}
    </div>
  );
}

export default ChatInput;
