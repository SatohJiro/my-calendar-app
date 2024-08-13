import React from "react";
import Calendar from "./components/Calendars";
import { CalendarProvider } from "./context/CalendarContext";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  </ThemeProvider>
);

export default App;
