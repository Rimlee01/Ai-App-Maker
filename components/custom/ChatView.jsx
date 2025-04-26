"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateTokens = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && getWorkspaceData();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const getWorkspaceData = async () => {
    const result = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };

  const GetAiResponse = async () => {
    try {
      setLoading(true);
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      const result = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });

      const aiResp = {
        role: "ai",
        content: result.data.result,
      };

      setMessages((prev) => [...prev, aiResp]);

      await UpdateMessages({
        messages: [...messages, aiResp],
        workspaceId: id,
      });

      const token =
        Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      await UpdateTokens({
        userId: userDetail?._id,
        token: token,
      });

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onGenerate = (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);

    setUserInput(""); // To clear the text area after submission
  };

  return (
    <div className="h-full flex flex-col max-h-[80vh]">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg mb-2 flex gap-2 items-center leading-7"
              style={{ backgroundColor: Colors.BACKGROUND }}
            >
              {msg.role === "user" && (
                <Image
                  src={userDetail?.picture || "/default-avatar.png"}
                  alt="userImage"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <ReactMarkdown className="flex flex-col">
                {msg.content}
              </ReactMarkdown>
            </div>
          ))
        ) : (
          <></>
        )}
        {loading && (
          <div
            className="p-2 rounded-lg mb- flex gap-2 items-center"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>
      {/* Input section */}
      <div className="flex items-end gap-3 w-full mt-3">
        {userDetail && (
          <Image
            onClick={toggleSidebar}
            className="rounded-full cursor-pointer mt-10"
            src={userDetail?.picture}
            width={30}
            height={30}
            alt="user image"
          />
        )}

        <div
          className="p-4 border h-auto rounded-xl w-full max-w-xl flex flex-col"
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
        >
          <div className="flex items-center gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="outline-none bg-transparent w-full h-18 md:h-24 max-h-56 resize-none"
              placeholder={Lookup.INPUT_PLACEHOLDER}
            ></textarea>
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
              />
            )}
          </div>
          <Link className="h-5 w-5 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
