import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { lenxtApi } from "../../api/lenxtApi";
import { AuthContenxt } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { AuthActions } from "./AuthActions";

const ChatActions = createContext();

const ChatActionsProvider = ({ children }) => {
  const { uid, accessToken } = useContext(AuthContenxt);
  const { setContacts, setProfiles, setMyProfile } = useContext(ChatContext);
  const { authLogout } = useContext(AuthActions);
  const navigate = useNavigate();

  const contactsFetcher = () => {
    lenxtApi
      .get("/contacts", {
        headers: { uid: uid, "access-token": accessToken },
      })
      .then((res) => {
        if (res.data.contacts) {
          setContacts(res.data.contacts);
        }
        if (res.data.msg === "user not found please authenticate") {
          navigate("/auth/signin");
          authLogout();
        }
      })
      .catch((err) => console.log(err));
  };

  const myProfileFetcher = () => {
    lenxtApi
      .get("/profiles/me", {
        headers: { uid: uid, "access-token": accessToken },
      })
      .then((res) => {
        if (res.data.profile) {
          setMyProfile(res.data.profile);
        }
        if (res.data.msg === "user not found please authenticate") {
          navigate("/auth/signin");
          authLogout();
        }
      })
      .catch((err) => console.log(err));
  };

  const profilesFetcher = () => {
    lenxtApi
      .get("/profiles", {
        headers: { uid: uid, "access-token": accessToken },
      })
      .then((res) => {
        if (res.data.profiles) {
          setProfiles(res.data.profiles);
        }
        if (res.data.msg === "user not found please authenticate") {
          navigate("/auth/signin");
          authLogout();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    profilesFetcher();
    myProfileFetcher();
    contactsFetcher();
  }, []);

  return (
    <ChatActions.Provider value={{ contactsFetcher }}>
      {children}
    </ChatActions.Provider>
  );
};

export { ChatActions, ChatActionsProvider };
