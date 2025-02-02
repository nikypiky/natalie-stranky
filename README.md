# Hairdresser Reservation System

This project is a web application for managing reservations at a hairdresser's salon, created using Flask for the backend and React for the frontend. The application allows clients to make reservations, verify their reservations via email, and view available time slots. It also includes an admin panel for managing reservations, time slots, and customer information.

## Features

- **Client Reservation Management**
  - Clients can create reservations by selecting a date and time from available slots.
  - Clients receive a verification email upon creating a reservation, containing a confirmation link.
  - Clients can confirm or cancel their reservations via the frontend.

- **Admin Panel**
  - Admins can log in to manage reservations, view confirmed and pending reservations, and delete them if needed.
  - Admins can add, view, or delete available time slots.

- **Session Management**
  - Sessions are securely handled using cookies, allowing admins to stay logged in across different pages.

- **Email Notifications**
  - Verification emails are sent when a reservation is made.
  - Reminder emails are sent for pending reservations.
  - Reservations not confirmed within two days are automatically deleted and notified via email.

- **Database**
  - SQLite is used for storing reservation data, including client information, reservations, free time slots, and past reservations.

- **Cron Jobs**
  - Periodic tasks like clearing old free dates, moving old reservations to the past, and deleting unconfirmed reservations are automated using APScheduler.

## Technologies Used

- **Backend:** Flask, SQLite
- **Frontend:** React (Material-UI)
- **Email Service:** Flask-Mail (Gmail SMTP)
- **Scheduler:** APScheduler
- **Session Management:** Cookies and Flask-Sessions
- **Cross-Origin Resource Sharing (CORS):** Flask-CORS

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/hairdresser-reservation.git
    cd hairdresser-reservation
    ```

2. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up environment variables:
    - `MAIL_USERNAME` and `MAIL_PASSWORD` for Gmail (used for sending verification emails).
    - Make sure the SMTP server is configured correctly in `app.config`.

4. Run the Flask backend:

    ```bash
    python app.py
    ```

5. The backend will run at `http://localhost:5000`. The frontend (React) should be set up separately and will interact with the API endpoints.

## API Endpoints

- **POST /login:** Logs in an admin user.
- **POST /verify_session:** Verifies an admin session.
- **GET /get_reservations:** Fetches confirmed reservations.
- **POST /add_free_dates:** Adds available time slots.
- **GET /get_free_dates:** Retrieves available time slots.
- **POST /delete_free_dates:** Deletes a specific time slot.
- **POST /add_reservation_pending:** Creates a new reservation (pending confirmation).
- **POST /confirm_reservation:** Confirms a reservation.
- **POST /delete_reservation:** Deletes a reservation.

## Cron Jobs

- **clear_old_free_dates:** Deletes expired time slots from the database.
- **move_old_reservations:** Moves old reservations to the past reservations table.
- **remind_pending_reservation:** Sends reminders for pending reservations.
- **delete_pending_reservation:** Deletes unconfirmed reservations older than 2 days.

## Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request. Any feedback or suggestions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
