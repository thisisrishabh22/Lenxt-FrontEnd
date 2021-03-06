import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "./NavBar";
import Chats from "./Chats";
import { Tabs } from "@mui/material";
import { ChatContext } from "../store/Context/ChatContext";
import AddUser from "./AddUser";
import Loader from "./Loader";

const DeskTopChat = React.memo(() => {
  document.title = "Lenxt Chat";
  const [value, setValue] = React.useState("0");
  const { contacts, profiles, myProfile, messages } =
    React.useContext(ChatContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (myProfile?.email && messages !== [] && contacts !== [] && profiles) {
    if (contacts[0]) {
      return (
        <Box sx={{ overflow: "hidden" }}>
          <NavBar />
          <Box>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: "90.37vh",
              }}
            >
              <TabContext value={value}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  scrollButtons={false}
                  value={value}
                  onChange={handleChange}
                  aria-label="Chats"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  {contacts &&
                    contacts.map((contact, index) => {
                      let contactMail = contact.members.filter(
                        (item) => item !== myProfile?.email
                      );
                      contactMail = contactMail[0];
                      let profileId = profiles.filter(
                        (pT) => pT.email === contactMail
                      );
                      profileId = profileId[0];
                      if (profileId) {
                        return (
                          <Tab
                            key={index}
                            icon={<PersonIcon />}
                            iconPosition="start"
                            label={profileId.name}
                            value={index.toString()}
                            sx={{
                              ml: 0,
                              width: 300,
                              justifyContent: "flex-start !important",
                            }}
                          />
                        );
                      }
                    })}
                </Tabs>
                {contacts &&
                  contacts.map((contact, index) => {
                    let contactMail = contact.members.filter(
                      (item) => item !== myProfile?.email
                    );
                    contactMail = contactMail[0];
                    let profileId = profiles.filter(
                      (pT) => pT.email === contactMail
                    );
                    profileId = profileId[0];
                    let message = messages.filter((msg) => {
                      return msg.members.indexOf(profileId.email) !== -1;
                    });
                    if (message[0]) {
                      message = message[0];
                    }
                    return (
                      <TabPanel
                        key={index}
                        sx={{ width: "100%", paddingBottom: 1, p: 0 }}
                        value={index.toString()}
                      >
                        <Chats
                          message={message}
                          myMail={myProfile?.email}
                          clientMail={profileId?.email}
                        />
                      </TabPanel>
                    );
                  })}
              </TabContext>
            </Box>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box sx={{ overflow: "hidden" }}>
          <NavBar />
          <AddUser />
        </Box>
      );
    }
  } else {
    return (
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Loader />
      </Box>
    );
  }
});

export default DeskTopChat;
