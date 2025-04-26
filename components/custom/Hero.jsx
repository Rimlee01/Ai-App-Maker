"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { use, useContext, useState } from "react";
import SignInDialog from "./SignInDialog";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [userInput, setUserInput] = useState();

  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }

    const msg = {
      role: "user",
      content: input,
    };

    setMessages(msg);
    console.log(userDetail);
    console.log("It runned")
    
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });

    console.log(workspaceId);
    router.push("/workspace/" + workspaceId);
  };

  return (
    
    <div className="flex flex-col items-center mt-36 md:mt-30 px-4 w-full ">
      <h2 className="font-bold text-3xl md:text-4xl text-center">
        {Lookup.HERO_HEADING}
      </h2>
      <p className="text-gray-400 font-medium text-center mt-2">
        {Lookup.HERO_DESC}
      </p>
      <div
        className="p-4 md:p-5 border rounded-xl w-full max-w-lg mt-3 bg-opacity-90"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none bg-transparent w-full h-24 md:h-32 resize-none text-sm md:text-base p-2"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          ></textarea>
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div className="flex justify-end mt-2">
          <Link className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 w-full max-w-xl">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-2 border rounded-full text-xs md:text-sm text-gray-500 hover:text-white cursor-pointer"
          >
            {suggestion}
          </h2>
        ))}
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
};

export default Hero;
