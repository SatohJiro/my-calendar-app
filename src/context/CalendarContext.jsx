import React, { createContext, useState } from "react";
import mockEvents from "../data/mockData";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(mockEvents);

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        events,
        setEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
