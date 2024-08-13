import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";

export const useCalendar = () => useContext(CalendarContext);
