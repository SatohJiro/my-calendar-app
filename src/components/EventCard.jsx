import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Link,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { formatEventTime } from "../utils/fomat";

const EventCard = ({ event, onDelete }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        p: 2,
        borderLeft: "7px solid",
        borderLeftColor: "#29ccd1d9",
      }}
    >
      <Stack direction="row" width="100%">
        <Box width="90%" display="flex" flexDirection="column">
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            fontSize={14}
            color="text.secondary"
            sx={{ textDecoration: "underline" }}
          >
            {event.title}
          </Typography>
          <Typography
            variant="caption"
            fontWeight="bold"
            color="text.secondary"
            lineHeight={1.5}
          >
            {event.description}
          </Typography>
          <Typography
            variant="caption"
            fontWeight="bold"
            color="text.secondary"
            lineHeight={1.5}
          >
            {event.location}
          </Typography>
          <Typography
            variant="caption"
            fontWeight="bold"
            color="text.secondary"
            lineHeight={1.5}
          >
            {formatEventTime(event.start, event.end, event.timezone)}
          </Typography>
        </Box>
        <Stack
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          gap={1}
        >
          <IconButton
            sx={{
              width: 30,
              height: 30,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "50%",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <VideocamIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
            }}
            onClick={() => onDelete(event.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
      <Stack gap={2}>
        {event.recurrence && (
          <Chip
            size="small"
            sx={{ width: "100px" }}
            label={
              <Typography variant="caption" fontWeight="bold">
                {event.recurrence.frequency}
              </Typography>
            }
          ></Chip>
        )}
        <Box display="flex" alignItems="center">
          <Avatar sx={{ width: "24px", height: "24px", marginRight: "10px" }}>
            <PersonIcon />
          </Avatar>
          <Link href="#" variant="caption">
            View Client Profile
          </Link>
        </Box>
      </Stack>
    </Paper>
  );
};

export default EventCard;
