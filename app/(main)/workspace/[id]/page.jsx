import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import React from "react";

const Workspace = () => {
  return (
    <div className="max-h-[95vh] w-full mt-20 rounded-lg flex flex-col md:flex-row gap-5 px-3 overflow-y-auto">
      <div className="w-full flex-1 md:w-1/4 min-h-[40vh] md:min-h-80  ">
        <ChatView />
      </div>
      <div className="w-full p md:w-3/4 min-h-[60vh] md:min-h-0  ">
        <CodeView />
      </div>
    </div>
  );
};



export default Workspace;
