import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
import { DateCalendar } from '@mui/x-date-pickers';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';

export default function Reservation() {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    // Fetch available dates on mount
    axios.get('/api/available-dates').then((response) => {
      setAvailableDates(response.data);
    });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Fetch available times for the selected date
    axios
      .get(`/api/available-times?date=${date.toISOString().split('T')[0]}`)
      .then((response) => {
        setAvailableTimes(response.data);
      });
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <DateCalendar
        onChange={handleDateChange}
        tileDisabled={({ date }) => !availableDates.includes(date.toISOString().split('T')[0])}
      />
      {selectedDate && (
        <div>
          <h2>Available Times</h2>
          <Select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a Time
            </MenuItem>
            {availableTimes.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

// import Calendar from "./Calendar";

// export default function Reservation() {
// 	return (
// 	<Calendar/>
// 	);
// }
