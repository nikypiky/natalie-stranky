from flask import Flask, request, jsonify, make_response
import sqlite3
from werkzeug.security import check_password_hash
import secrets
from flask_mail import Message, Mail
from flask_apscheduler import APScheduler
from datetime import datetime, timedelta
from itertools import chain
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# confuigure mailing function
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "n29952639@gmail.com"
app.config['MAIL_PASSWORD'] = "eoyn phpq bdoe gmey "
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# secret key for cookies
app.secret_key = "test"

db_path = "reservations.db"

# cofigure scheduler


class Config:
    SCHEDULER_API_ENABLED = True


scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()


def run_sql(script, values=0):
    connection = sqlite3.connect(db_path)
    # connection.row_factory = sqlite3.Row
    try:
        cursor = connection.cursor()
        if values:
            cursor.execute(script, values)
        else:
            cursor.execute(script)
        connection.commit()
        return cursor.fetchall()
    except Exception as e:
        print(f"An error occurred: {e}")
        return (f"An error occurred: {e}")


@app.route("/login", methods=["GET", "POST"])
def login():
    user_input = request.get_json()
    password = run_sql("""SELECT password
                          FROM login
                          WHERE username = ?""",
                       (user_input["username"],))
    response = make_response()
    if not password:
        # response.set_cookie("login", "incorrect username")
        return response, 400
    if check_password_hash(password[0][0], user_input["password"]):
        session_token = secrets.token_hex(16)
        run_sql("INSERT INTO session (session) VALUES (?)", (session_token,))
        response.set_cookie("session_token", session_token)
        return response
    else:
        # response.set_cookie("login", "incorrect password")
        return response, 401


@app.route("/verify_session", methods=["GET", "POST"])
def verify_session(session_token=0):
    if not session_token:
        session_token = request.cookies.get('session_token')
    # to bypass errors when sessionToken not yet initialised
    try:
        verification = run_sql("""SELECT *
                               FROM session
                               WHERE session = ?""",
                               (session_token,))
    except:
        verification = 0
    response = make_response()
    if not verification:
        return response, 402
    else:
        return response, 250


@app.route("/get_reservations", methods=["GET", "POST"])
def get_reservations():
    response = make_response()
    foo, status_code = verify_session()
    if status_code != 250:
        return response, 404
    data = run_sql("""SELECT * FROM reservations
                   WHERE confirmation = true
                   ORDER BY time_of_reservation
                    ;""")
    reservations = []
    for i in data:
        reservation = {}
        reservation["id"] = i[0]
        reservation["name"] = i[1]
        reservation["email"] = i[2]
        reservation["phone"] = i[3]
        reservation["time"] = i[4]
        reservation["type"] = i[5]
        reservation["notes"] = i[6]
        reservations.append(reservation)
    return jsonify(reservations)


@app.route("/add_free_dates", methods=["GET", "POST"])
def add_free_dates():
    response = make_response()
    foo, status_code = verify_session()
    if status_code != 250:
        return response, 404
    user_input = request.get_json()
    time_change = timedelta(minutes=15)
    start = datetime.strptime(user_input["start"], "%Y-%m-%dT%H:%M:%S.%fZ")
    end = datetime.strptime(user_input["end"], "%Y-%m-%dT%H:%M:%S.%fZ")
    while start <= end:
        run_sql("INSERT INTO free_dates (free_slot) VALUES (?)",
                (start.strftime("%Y-%m-%d %H:%M"), ))
        start = start + time_change
    return response


@app.route("/get_free_dates", methods=["GET", "POST"])
def get_free_dates():
    free_dates = run_sql(
        "SELECT DISTINCT date(free_slot) FROM free_dates ORDER BY free_slot")
    free_slots = {}
    for date in free_dates:
        free_slots[date[0]] = run_sql(
            "SELECT time(free_slot) FROM free_dates WHERE date(free_slot) = ?", (date[0], ))
    return jsonify(free_slots)


@app.route("/delete_free_dates", methods={"GET", "POST"})
def delete_free_dates():
    response = make_response()
    foo, status_code = verify_session()
    if status_code != 250:
        return response, 404
    user_input = request.get_json()
    start = datetime.strptime(
        user_input["date"] + user_input["start"], "%Y-%m-%d%H:%M")
    end = datetime.strptime(
        user_input["date"] + user_input["end"], "%Y-%m-%d%H:%M")
    run_sql("""DELETE FROM free_dates
                WHERE datetime(free_slot) >= datetime(?)
                AND datetime(free_slot) < datetime(?)""",
            (start.strftime("%Y-%m-%d %H:%M"),
             end.strftime("%Y-%m-%d %H:%M")))
    return response


def delete_time_slots(start, length):
    end = start + timedelta(minutes=15*length)
    run_sql("""DELETE FROM free_dates
                WHERE datetime(free_slot) >= datetime(?)
                AND datetime(free_slot) < datetime(?)""",
            (start.strftime("%Y-%m-%d %H:%M"),
             end.strftime("%Y-%m-%d %H:%M")))


def return_time_slots(start, length):
    time_change = time_change = timedelta(minutes=15)
    for i in range(length):
        run_sql("INSERT INTO free_dates (free_slot) VALUES ?",
                (start.strftime("%Y-%m-%d %H:%M")))
        start = start + time_change


@app.route("/add_reservation_pending", methods={"POST"})
def add_reservation_pending():
    response = make_response()
    user_input = request.get_json()
    verification_token = secrets.token_hex(16)
    start = datetime.strptime(
        user_input["date"] + user_input["start"], "%Y-%m-%d%H:%M")
    run_sql("""INSERT INTO reservations
            (name, email, phone, time_of_reservation,
             type, duration, verification_token, confirmation)
            VALUES (?, ?, ?, ?, ?, ?, ?, false)""",
            (user_input["name"],
             user_input["email"],
             user_input["tel."],
             (user_input["date"] + " " + user_input["start"]),
             user_input["type"],
             user_input["time"],
             verification_token))
    # Create the email message
    mail_message = Message(
        "Reservation Pending",  # Subject of the email
        sender=app.config["MAIL_USERNAME"],
        recipients=[user_input["email"]]  # Email recipient
    )
    # Set email body content
    mail_message.body = f"Your reservation is pending. Please verify your reservation at the following url: http://localhost:3000/reservation_confirmation/{verification_token}"

    # Send the email
    try:
        mail.send(mail_message)
        print("Mail has been sent")
    except Exception as e:
        print(f"Error sending email: {e}")

    delete_time_slots(start, user_input["time"])
    return response


@app.route("/confirm_reservation", methods=["POST"])
def confirm_reservation():
    response = make_response()
    user_input = request.get_json()
    run_sql("""UPDATE reservations
            SET confirmation = true
            WHERE verification_token = ?;""",
            (user_input, ))
    return response


@app.route("/delete_reservation", methods=["POST"])
def delete_reservation():
    response = make_response()
    user_input = request.get_json()
    print(user_input)
    run_sql("DELETE FROM reservations WHERE id = ?", (user_input,))
    return response


def clear_old_free_dates():
    run_sql("DELETE FROM free_dates where date(free_slot) <= date();")


def move_old_reservations():
    run_sql("""INSERT INTO past_reservations
            (name, email, phone, time_of_reservation, type)
                SELECT name, email, phone, time_of_reservation, type
                FROM reservations
                WHERE date(time_of_reservation) <= date();""")
    run_sql("DELETE FROM reservations where date(time_of_reservation) <= date();")


def remind_pending_reservation():
    email_pending_reservations = run_sql("""SELECT email, verification_token
                                         FROM pending_reservations
                                         WHERE date(created_at) = date('now', '-1 day')
                                         AND confirmation = false;""")
    for email in email_pending_reservations:
        mail_message = Message(
            "Reservation Pending",  # Subject of the email
            sender=app.config["MAIL_USERNAME"],
            recipients=[email[0]]  # Email recipient
        )
    # Set email body content
    mail_message.body = f"Your reservation is pending. Please verify your reservation at the following url: http://localhost:3000/reservation_confirmation/{email[1]}, if you fail to do so your reservation will be canceled."


def delete_pending_reservation():
    email_pending_reservations = run_sql("""SELECT email, verification_token
                                         FROM pending_reservations
                                         WHERE date(created_at) = date('now', '-2 day')
                                         AND confirmation = false;""")
    run_sql("""DELETE FROM pending_reservations
            WHERE date(created_at) <= date('now', '-2 day')
            AND confirmation = false; """)
    for email in email_pending_reservations:
        mail_message = Message(
            "Reservation Canceled",  # Subject of the email
            sender=app.config["MAIL_USERNAME"],
            recipients=[email[0]]  # Email recipient
        )
    # Set email body content
    mail_message.body = f"Since you have not confirmed your reservation we unfortunately had to cancel it - if you with to create a new one please do se at this link:."


@scheduler.task('cron', id='cron_job', hour=19, minute=0)
def job_function():
    clear_old_free_dates()
    move_old_reservations()
    remind_pending_reservation()
    delete_pending_reservation()

    print("Interval job executed!")
# if __name__ == '__main__':
#     app.run(debug=True)


# INSER INTO past_reservations
