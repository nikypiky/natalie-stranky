import Login from "./Login";
import VerifySession from "../functions/VerifySession"
import AdminHeader from "./AdminHeader";
import { useState } from "react";
import ReservationsTable from "./ReservationsTable";

export default function AdminPage() {

	const [page, setPage] = useState(<ReservationsTable />)

	if (VerifySession()) {
		return (
			<>
				<AdminHeader onSendValue={setPage} />
				{page}
			</>
		)
	}
	else {
		return (
			<Login />
		)
	}
}
