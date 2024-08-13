import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { useCalendar } from "../hooks/useCalendar";
import clients from "../data/clients";

const EventForm = ({ open, handleClose }) => {
  const { events, setEvents } = useCalendar();
  const [formData, setFormData] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    location: "",
    type: "Webinar Event",
    client: "",
    recurrence: {
      frequency: "none",
      interval: 1,
      endDate: new Date(),
    },
    meetingLink: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRecurrenceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      recurrence: {
        ...prev.recurrence,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const newEvent = {
      id: `${Date.now()}`,
      ...formData,
      recurrence:
        formData.recurrence.frequency !== "none" ? formData.recurrence : null,
      ...(formData.type === "Booking Client" && {
        client: clients.find((c) => c.id === formData.client),
      }),
    };
    setEvents([...events, newEvent]);

    setFormData({
      title: "",
      start: new Date(),
      end: new Date(),
      description: "",
      location: "",
      type: "Webinar Event",
      client: "",
      recurrence: {
        frequency: "none",
        interval: 1,
        endDate: new Date(),
      },
      meetingLink: "",
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Stack flexDirection="row" gap={1}>
            <TextField
              label="Start"
              type="datetime-local"
              fullWidth
              margin="normal"
              name="start"
              InputLabelProps={{ shrink: true }}
              value={formData.start.toISOString().slice(0, 16)}
              onChange={(e) =>
                setFormData({ ...formData, start: new Date(e.target.value) })
              }
            />
            <TextField
              label="End"
              type="datetime-local"
              fullWidth
              margin="normal"
              name="end"
              InputLabelProps={{ shrink: true }}
              value={formData.end.toISOString().slice(0, 16)}
              onChange={(e) =>
                setFormData({ ...formData, end: new Date(e.target.value) })
              }
            />
          </Stack>
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="Webinar Event">Webinar Event</MenuItem>
              <MenuItem value="Booking Client">Booking Client</MenuItem>
            </Select>
          </FormControl>
          {formData.type === "Booking Client" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Client</InputLabel>
              <Select
                label="Client"
                name="client"
                value={formData.client}
                onChange={handleChange}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={client.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={client.name} />
                    </ListItem>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="Meeting Link"
            fullWidth
            margin="normal"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Recurrence Frequency</InputLabel>
            <Select
              label="Recurrence Frequency"
              name="frequency"
              value={formData.recurrence.frequency}
              onChange={handleRecurrenceChange}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          {formData.recurrence.frequency !== "none" && (
            <Stack spacing={2}>
              <TextField
                label="Interval"
                type="number"
                fullWidth
                name="interval"
                value={formData.recurrence.interval}
                onChange={handleRecurrenceChange}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                name="endDate"
                InputLabelProps={{ shrink: true }}
                value={formData.recurrence.endDate.toISOString().slice(0, 10)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recurrence: {
                      ...formData.recurrence,
                      endDate: new Date(e.target.value),
                    },
                  })
                }
              />
            </Stack>
          )}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
