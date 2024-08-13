const mockEvents = [
  {
    id: "1",
    title: "Weekly Meeting with team",
    start: new Date("2024-08-15T10:00:00"),
    end: new Date("2024-08-15T11:00:00"),
    description: "Discuss project milestones",
    location: "Client Office D",
    type: "Webinar Event",
    timezone: "America/New_York",
    recurrence: {
      frequency: "weekly",
      interval: 1,
      endDate: new Date("2024-08-30"),
    },
    meetingLink: "https://example.com/meeting/1",
  },
  {
    id: "2",
    title: "Client Presentation",
    start: new Date("2024-08-15T10:00:00"),
    end: new Date("2024-08-15T11:00:00"),
    description: "Discuss project milestones",
    location: "Client Office B",
    type: "Booking Client",
    timezone: "America/Los_Angeles",
    recurrence: null,
    client: {
      name: "John Doe",
      avatar: "https://example.com/avatar/johndoe.png",
    },
    meetingLink: "https://example.com/meeting/2",
  },
  {
    id: "3",
    title: "Preview Code",
    start: new Date("2024-08-15T10:00:00"),
    end: new Date("2024-08-15T11:00:00"),
    description: "Discuss project milestones",
    location: "Client Office A",
    type: "Booking Client",
    timezone: "Europe/London",
    recurrence: {
      frequency: "daily",
      interval: 1,
      endDate: new Date("2024-08-30"),
    },
    client: {
      name: "Jane Smith",
      avatar: "https://example.com/avatar/janesmith.png",
    },
    meetingLink: "https://example.com/meeting/3",
  },
];

export default mockEvents;
