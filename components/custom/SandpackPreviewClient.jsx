import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useContext, useEffect, useRef } from 'react'

const SandpackPreviewClient = () => {
    const previewRef = useRef();
    const {sandpack} = useSandpack();
    const {action,setAction} = useContext(ActionContext);


    const GetSandpackClient = async()=>{
        const client  = previewRef.current?.getClient();
        if(client){
            const result = await client.getCodeSandboxURL();
            console.log(result);

              
            if(action?.actionType=='deploy'){
              const url = "https://" + result?.sandboxId + ".csb.app/";
              window.open(url, "self"); // Opens in a new tab
            }else if(action?.actionType == 'export'){
                window?.open(result?.editorUrl);
            }


        }
    }

    useEffect(()=>{
        GetSandpackClient();
    },[sandpack && action])



  return (
    
    <SandpackPreview
    ref={previewRef}
    style={{ height: "73vh" }} showNavigator={true} />
  )
}

export default SandpackPreviewClient