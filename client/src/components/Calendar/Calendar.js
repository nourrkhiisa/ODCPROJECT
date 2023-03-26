import React, { useState, useEffect } from "react";
import CalendarUI from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const Calendar = ({ events, onDateChange }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar">
      <CalendarUI
        onChange={handleDateChange}
        value={date}
        tileContent={({ date, view }) => {
          if (view !== "month") {
            return null;
          }

          const eventsForDate = events.filter(
            (event) => event.date.toDateString() === date.toDateString()
          );

          return (
            <div className="events">
              {eventsForDate.map((event) => (
                <div key={event.id} className="event">
                  {event.title}
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calendar;
