import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { lenxtApi } from "../../api/lenxtApi";
import { AuthContenxt } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { SocketContext } from "../Context/SocketContext";
import { AuthActions } from "./AuthActions";

const ChatActions = createContext();

const ChatActionsProvider = ({ children }) => {
  const { uid, accessToken } = useContext(AuthContenxt);
  const { setContacts, setProfiles, setMyProfile, setMessages, messages } =
    useContext(ChatContext);
  const { authLogout } = useContext(AuthActions);
  const { socket } = useContext(SocketContext);
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

  const messagesFetcher = () => {
    lenxtApi
      .get("/messages", {
        headers: { uid: uid, "access-token": accessToken },
      })
      .then((res) => {
        if (res.data.messages) {
          setMessages(res.data.messages);
        }
        if (res.data.msg === "user not found please authenticate") {
          navigate("/auth/signin");
          authLogout();
        }
      })
      .catch((err) => console.log(err));
  };

  const sendMessage = (data, clientMail) => {
    lenxtApi
      .post(
        "/messages/addMessage",
        { msgData: data, clientMail: clientMail },
        {
          headers: { uid: uid, "access-token": accessToken },
        }
      )
      .then((res) => {
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
          messagesFetcher();
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

  useEffect(() => {
    socket.on("receive_contacts", (data) => {
      if (data.msg === "load_contacts") {
        contactsFetcher();
        messagesFetcher();
      }
    });

    socket.on("receive_message", (data) => {
      contactsFetcher();
      messagesFetcher();
    });

    socket.on("message_sent", (data) => {
      if (data.msg === "message added") {
        contactsFetcher();
        messagesFetcher();
      }
    });
  }, [socket]);

  return (
    <ChatActions.Provider
      value={{ sendMessage, contactsFetcher, messagesFetcher }}
    >
      {children}
    </ChatActions.Provider>
  );
};

export { ChatActions, ChatActionsProvider };
