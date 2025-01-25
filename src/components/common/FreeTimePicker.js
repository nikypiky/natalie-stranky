import { TIME_FORMAT } from "../../constants";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function FreeTimePicker({ data, setData, freeDates, setKey }) {
    const onTimeChange = (key, newValue) => {
        setData((data) => ({
            ...data,
            [key]: newValue,
        }));
    };

    const checkAvailability = (time, timesArray) => {
        // Check if the required number of slots are available
        for (let i = 0; i < data.time + 1; i++) {
            const timeString = time.format(TIME_FORMAT);
            if (!timesArray.includes(timeString)) {
                return false; // Time slot is unavailable
            }
            time = time.add(15, "minutes"); // Move to the next slot
        }
        return true; // All required slots are available
    };

    const isTimeFree = (time, view) => {
        let timesArray = [];

        try {
            timesArray = Object.values(freeDates[data.date]?.flat().map((slot) => slot.slice(0, 5)) || []);
        } catch (e) {
            console.error("Error fetching times: ", e);
        }

        if (view === "hours") {
            const hourArray = timesArray.map((slot) => slot.slice(0, 2));
            return !hourArray.includes(time.format(TIME_FORMAT).slice(0, 2));
        }

        if (view === "minutes") {
            return !checkAvailability(time, timesArray);
        }

        return true; // Default to true
    };

    return (
        <LocalizationProvider className="calendar" dateAdapter={AdapterDayjs}>
            <TimePicker
                shouldDisableTime={isTimeFree}
                ampm={false}
                label={setKey}
                format="HH:mm"
                minutesStep={15}
                skipDisabled={true}
                onChange={(newValue) => {
                    if (newValue) {
                        onTimeChange(setKey, newValue.format(TIME_FORMAT));
                    }
                }}
                onError={(error) => console.log(error)}
            />
        </LocalizationProvider>
    );
}
