from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors

# Database details
app = Flask(__name__)
app.secret_key = 'canyon'

app.config['MYSQL_HOST'] = '107.180.1.16'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'spring2024Cteam10'
app.config['MYSQL_PASSWORD'] = 'spring2024Cteam10'
app.config['MYSQL_DB'] = 'spring2024Cteam10'
mysql = MySQL(app)

# App route login
@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM GUIDEU WHERE username = %s AND password = %s', (username, password))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            session['usertype'] = account['usertype']
      
            # Can read relevant data into session variable
            # session['user_data'] = {
            #     'XXXX': account['XXXX'],
            #     'XXXX': account['XXXX']
            # }
            
            if session['usertype'] == 'Mentor':
                return redirect(url_for('mentor'))
            elif session['usertype'] == 'Mentee':
                return redirect(url_for('mentee'))   
        else:
            msg = 'Incorrect username/password!'
            return render_template('login.html', msg=msg)

    return render_template('login.html', msg='')


# App route mentor
@app.route('/mentor', methods=['GET', 'POST'])
def mentor():
    if 'username' in session:
            username = session['username']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT usertype, department, bio, id, firstname, lastname, certification, IorE, TorS, MorS FROM GUIDEU WHERE username = %s', (username,))
            mentor_info = cursor.fetchone()
            print(mentor_info)
            if mentor_info['certification']:
                mentor_info['certification'] = mentor_info['certification'].split(',')
            return render_template('mentor.html', mentor_info=mentor_info)

# App route mentee
@app.route('/mentee', methods=['GET', 'POST'])
def mentee():
    if 'username' in session:
            username = session['username']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT usertype, department, bio, id, firstname, lastname, certification, IorE, TorS, MorS FROM GUIDEU WHERE username = %s', (username,))
            mentee_info = cursor.fetchone()
            print(mentee_info)
            if mentee_info['certification']:
                mentee_info['certification'] = mentee_info['certification'].split(',')
    return render_template('mentee.html', mentee_info=mentee_info)

# App route register
@app.route('/register', methods =['GET','POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        first_name = request.form['fname']
        last_name = request.form['lname']
        username = request.form['username']
        password = request.form['password']
        bio = request.form['bio']
        department = request.form['department']
        certifications = request.form.getlist('certifications')
        print(certifications)
        certifications_str = ','.join(certifications)
        print(certifications_str)
        role = request.form['role']
        personality = request.form['personality']
        personality2 = request.form['personality2']
        personality3 = request.form['personality3']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM GUIDEU WHERE username = % s', (username, ))
        account = cursor.fetchone()
        if account:
            msg = 'Account already exists !'
        else:
            # cursor.execute('INSERT INTO GUIDEU VALUES ( % s, % s, % s, % s, % s, % s, % s, % s, % s, % s, % s)', (username, password, role, bio, department, certifications_str, first_name, last_name, personality, personality2, personality3))
            cursor.execute('INSERT INTO GUIDEU (username, password, usertype, bio, department, certification, firstname, lastname, IorE, TorS, MorS) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (username, password, role, bio, department, certifications_str, first_name, last_name, personality, personality2, personality3))
            mysql.connection.commit()
            msg = 'You have successfully registered!'
            return render_template('login.html', msg = msg, username=username)
    return render_template('register.html', msg = msg)


# App route directory
@app.route('/directory')
def directory():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT firstname, lastname, department, bio, certification, usertype FROM GUIDEU")
    data = cursor.fetchall()
    mentors = [{'firstname': row[0], 'lastname': row[1], 'department': row[2], 'bio': row[3], 'certification': row[4]} for row in data if row[5] == 'Mentor']
    print(mentors)
    mentees = [{'firstname': row[0], 'lastname': row[1], 'department': row[2], 'bio': row[3], 'certification': row[4]} for row in data if row[5] == 'Mentee']
    print(mentees)
    return render_template('directory.html', mentors=mentors, mentees=mentees)


# App route logout
@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True, port=8080)
