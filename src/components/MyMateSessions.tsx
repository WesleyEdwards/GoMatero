import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { MateSession, PublicUser } from "../utils/models";
import { AuthContext } from "../context/AuthContext";
import { MateSessionInfo } from "./MateSessionInfo";

type MyMateSessionsProps = {
  onOpenModal: () => void;
};
export const MyMateSessions: FC<MyMateSessionsProps> = (props) => {
  const { onOpenModal } = props;
  const { api } = useContext(AuthContext);
  const [sessions, setSessions] = useState<MateSession[]>([]);
  const [userList, setUserList] = useState<PublicUser[]>([]);

  const fetchSessionsInfo = async () => {
    const sessions = await api.fetchMateSessions();
    const allFriends = sessions.flatMap((session) => session.attendedMembers);
    const friends = await api.publicUsers(allFriends);
    setUserList(friends);
    setSessions(sessions);
  };
  useEffect(() => {
    fetchSessionsInfo();
  }, []);

  return (
    <Stack justifyContent="center" gap="1rem" padding="1rem">
      <Typography variant="h4" textAlign="center">
        My Sessions
      </Typography>
      <Button onClick={onOpenModal} variant="contained" endIcon={<AddIcon />}>
        Add Session
      </Button>
      <Divider />
      <div>
        {sessions.map((session) => (
          <MateSessionInfo
            key={session.id}
            session={session}
            userList={userList}
          />
        ))}
      </div>
    </Stack>
  );
};
