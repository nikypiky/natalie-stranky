import Dashboard from "./Dashboard";
import Login from "./Login";
import VerifySession from "./verifySession";

export default function AdminPage() {

	if (VerifySession()) {
		return (
			<Dashboard />
		)
	}
	else {
		return (
			<Login />
		)
	}
}
