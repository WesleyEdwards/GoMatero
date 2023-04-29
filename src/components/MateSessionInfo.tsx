import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Divider,
} from "@mui/material";
import { MateSession, PublicUser } from "../utils/models";
import { FC } from "react";

type MateSessionInfoProps = {
  session: MateSession;
  userList: PublicUser[];
};
export const MateSessionInfo: FC<MateSessionInfoProps> = (props) => {
  const { session, userList } = props;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{session.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap="1rem">
          <Typography>{new Date(session.date).toLocaleDateString()}</Typography>
          <img
            src={session.image}
            style={{ width: "100%", height: "auto" }}
            alt={session.title}
          />
          <Typography>{session.description}</Typography>
          <Divider />
          <div>
            {session.attendedMembers.map((memberId) => (
              <Typography key={memberId}>
                - {userList.find((member) => member.uid === memberId)?.name}
              </Typography>
            ))}
          </div>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
