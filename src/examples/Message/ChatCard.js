import { Card, CardContent, Typography, Avatar, Divider, IconButton } from "@mui/material";
import { Message as MessageIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const ChatCard = ({ name, message, timestamp, avatar, hasNewMessage, onClick, isSelecting }) => {
  return (
    <Card
      elevation={3}
      style={{
        marginBottom: "16px",
        borderRadius: "16px",
        cursor: "pointer",
        backgroundColor: `${isSelecting ? "#4158D0" : ""}`,
        backgroundImage: `${
          isSelecting ? "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)" : ""
        }`,
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={avatar} alt={name} style={{ marginRight: "12px" }} />
          <div>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {hasNewMessage ? "New message" : timestamp}
            </Typography>
          </div>
        </div>
        <IconButton>
          <MessageIcon color={hasNewMessage ? "primary" : "inherit"} />
        </IconButton>
      </div>
    </Card>
  );
};
ChatCard.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  hasNewMessage: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  isSelecting: PropTypes.bool,
};
export default ChatCard;
