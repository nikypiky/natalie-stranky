from werkzeug.security import generate_password_hash
import sqlite3


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


def create_user():
    username = input("Enter username: ")
    password = generate_password_hash(input("Enter password: "))
    check_username = run_sql("SELECT * FROM login WHERE username = ?", (username,))
    if not check_username:
        run_sql("INSERT INTO login (username, password) VALUES (?,?)",
                (username, password))
    else:
        print("Username taken, please choose a different one.")
        create_user()


create_user()
