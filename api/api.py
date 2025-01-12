from flask import Flask, request, jsonify, make_response
import sqlite3
from werkzeug.security import check_password_hash
import json
import secrets

app = Flask(__name__)

# secret key for cookies
app.secret_key = "test"

db_path = "reservations.db"


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
        response.set_cookie("login", "incorrect username")
        return response, 400
    if check_password_hash(password[0][0], user_input["password"]):
        session_token = secrets.token_hex(16)
        run_sql("INSERT INTO session (session) VALUES (?)", (session_token,))
        response.set_cookie("session_token", session_token)
        return response
    else:
        response.set_cookie("login", "incorrect password")
        return response, 401

