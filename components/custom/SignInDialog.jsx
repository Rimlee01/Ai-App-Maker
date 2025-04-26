import React, { useContext, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import uuid4 from "uuid4";
import { api } from "@/convex/_generated/api";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);
  const convex = useConvex();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse.access_token } }
      );

      const user = userInfo?.data;

      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Fetch user from Convex after creation
      const result = await convex.query(api.users.GetUser, {
        email: user.email,
      });

      setUserDetail(result); // State update is asynchronous!
      closeDialog(false); // Close the dialog after sign-in
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  useEffect(() => {
    console.log("Updated userDetail:", userDetail);
  }, [userDetail]);

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="max-w-md mx-auto w-full">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col justify-center items-center gap-3 px-4 sm:px-6">
              <h2 className="font-bold text-xl sm:text-2xl text-center text-white">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2 text-center text-sm sm:text-base">
                {Lookup.SIGNIN_SUBHEADING}
              </p>
              <Button
                className="bg-blue-500 w-full sm:w-1/2 text-white hover:bg-blue-400 mt-3 py-2 text-sm sm:text-base"
                onClick={googleLogin}
              >
                Sign In with Google
              </Button>
              <p className="mt-2 text-center text-xs sm:text-sm">
                {Lookup.SIGNIn_AGREEMENT_TEXT}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
