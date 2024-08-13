import React, { useState, useMemo, useCallback } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Typography, Paper, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import EventForm from "./EventForm";
import EventCard from "./EventCard";
import { useCalendar } from "../hooks/useCalendar";
import { generateRecurrences, getEventsByDate } from "../utils/recurrence";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { events, selectedDate, setSelectedDate, setEvents } = useCalendar();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const allEvents = useMemo(() => {
    let eventsWithRecurrences = [];
    events.forEach((event) => {
      if (event.recurrence) {
        eventsWithRecurrences = [
          ...eventsWithRecurrences,
          ...generateRecurrences(event),
        ];
      } else {
        eventsWithRecurrences.push(event);
      }
    });
    return eventsWithRecurrences;
  }, [events]);

  const eventsForSelectedDate = useMemo(
    () => getEventsByDate(selectedDate, allEvents),
    [selectedDate, allEvents]
  );

  const handleSelectEvent = useCallback(
    () => window.open("https://example.com/meeting", "_blank"),
    []
  );

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  function Event({ event }) {
    return <Typography variant="caption">{event.title}</Typography>;
  }
  const dayPropGetter = (date) => {
    if (dayjs(date).isSame(dayjs(selectedDate), "day")) {
      return {
        style: {
          backgroundColor: "#cfe3ff",
        },
      };
    }
    return {};
  };

  const { components } = useMemo(
    () => ({
      components: {
        event: Event,
      },
    }),
    []
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container sx={{ height: "100vh", width: "100%" }} p={2}>
        <Grid item lg={3.5} sx={{ padding: 1 }}>
          <Paper>
            <StaticDatePicker
              value={dayjs(selectedDate)}
              onChange={(newDate) => setSelectedDate(newDate.toDate())}
              displayStaticWrapperAs="desktop"
            />
          </Paper>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: 1,
              mt: 0.5,
            }}
          >
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              height="70px"
            >
              <Stack>
                <Typography variant="h6" color="blue">
                  Upcoming Events
                </Typography>
                <Typography variant="caption">
                  {dayjs(selectedDate).format("ddd, DD MMM")}
                </Typography>
              </Stack>
              <Stack display="flex" flexDirection="column" gap={1}>
                <Button
                  size="small"
                  sx={{ borderRadius: "20px" }}
                  variant="contained"
                >
                  View All
                </Button>
                <Button
                  size="small"
                  sx={{ borderRadius: "20px" }}
                  onClick={() => setIsFormOpen(true)}
                  variant="contained"
                >
                  Create
                </Button>
              </Stack>
            </Stack>
            <Grid
              container
              display="flex"
              flexDirection="column"
              flex={1}
              width="100%"
              mt={2}
              overflow="auto"
              gap={1}
            >
              {eventsForSelectedDate.map((event) => (
                <Grid item xs={12} key={event.id}>
                  <EventCard event={event} onDelete={handleDeleteEvent} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg={8.5} pt={1} sx={{ height: "100%", overflow: "auto" }}>
          <BigCalendar
            components={components}
            date={moment(selectedDate)}
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectEvent={handleSelectEvent}
            onNavigate={(date) => setSelectedDate(date)}
            dayPropGetter={dayPropGetter}
            views={["month", "week", "day"]}
            popup
          />
        </Grid>

        <EventForm open={isFormOpen} handleClose={() => setIsFormOpen(false)} />
      </Grid>
    </LocalizationProvider>
  );
};

export default Calendar;
