import { createContext } from "react";


export const CodeContext = createContext({
    codeGenerated: false,
    setCodeGenerated:()=>{},
});

