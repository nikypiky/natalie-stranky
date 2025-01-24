import { TIME_FORMAT } from "../../constants"
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function FreeTimePicker({ data, setData, freeDates, setKey }) {

	const onTimeChange = (key, newValue) => {
		setData((data) => ({
			...data,
			[key]: newValue
		}))
	}

	const isTimeFree = (time, view) => {
		let timeString = time.format(TIME_FORMAT)
		let timesArray = []
		let hourArray = []
		try {
			timesArray = Object.values(freeDates[data.date].flat().map(time => time.slice(0, 5)))
			hourArray = timesArray.map(time => time.slice(0, 2))
		}
		catch (e) {
			console.log("error: ", e)
		}
		if (view === "hours") {
			return !hourArray.includes(timeString.slice(0, 2))
		}
		if (view === "minutes") {
			return !timesArray.includes(timeString)
		}
		return true
	}

	return (
		<>
			<LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
				<TimePicker
					shouldDisableTime={isTimeFree}
					ampm={false}
					label={"Start"}
					format='HH:mm'
					minutesStep={15}
					skipDisabled={true}
					onChange={(newValue) => onTimeChange(setKey, newValue.format(TIME_FORMAT))} />
			</LocalizationProvider>
		</>
	)
}
