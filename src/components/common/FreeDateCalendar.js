import { DATE_FORMAT } from "../../constants"
import { DateCalendar } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function FreeDateCalendar({ freeDates, setData }) {

	const onTimeChange = (key, newValue) => {
		setData((data) => ({
			...data,
			[key]: newValue
		}))
	}

	const isDateFree = (date) => {
		const dates = Object.keys(freeDates)
		let dateString = date.format(DATE_FORMAT)
		return !dates.includes(dateString)
	};

	return (
		<>
			<LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
				<DateCalendar
					disablePast={true}
					shouldDisableDate={isDateFree}
					onChange={(newValue) => onTimeChange("date", newValue.format(DATE_FORMAT))}
				/>
			</LocalizationProvider>
		</>
	)
}
