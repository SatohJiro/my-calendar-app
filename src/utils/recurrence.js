export const generateRecurrences = (event) => {
  const { start, end, recurrence } = event;
  const occurrences = [];
  let currentStart = new Date(start);
  const endDate = new Date(recurrence.endDate);

  while (currentStart <= endDate) {
    const occurrence = {
      ...event,
      start: new Date(currentStart),
      end: new Date(
        new Date(currentStart).setHours(
          currentStart.getHours() + (end - start) / 3600000
        )
      ),
    };
    occurrences.push(occurrence);

    if (recurrence.frequency === "daily") {
      currentStart.setDate(currentStart.getDate() + recurrence.interval);
    } else if (recurrence.frequency === "weekly") {
      currentStart.setDate(currentStart.getDate() + recurrence.interval * 7);
    } else if (recurrence.frequency === "monthly") {
      currentStart.setMonth(currentStart.getMonth() + recurrence.interval);
    }
  }

  return occurrences;
};

export const getEventsByDate = (date, allEvents) => {
  return allEvents?.filter((event) => {
    const eventDate = new Date(event.start).toDateString();
    return eventDate === date.toDateString();
  });
};
