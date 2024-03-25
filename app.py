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
            
            if session['usertype'] == 'mentor':
                return redirect(url_for('mentor'))
            elif session['usertype'] == 'mentee':
                return redirect(url_for('mentee'))   
        else:
            msg = 'Incorrect username/password!'
            return render_template('login.html', msg=msg)

    return render_template('login.html', msg='')


# App route mentor
@app.route('/mentor', methods=['GET', 'POST'])
def mentor():



    return render_template('mentor.html', msg='')

# App route mentee
@app.route('/mentee', methods=['GET', 'POST'])
def mentee():



    return render_template('mentee.html', msg='')

# App route register
@app.route('/register', methods =['GET','POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        username = request.form['username']
        password = request.form['password']
        bio = request.form['bio']
        department = request.form['department']
        certification = request.form['certification']
        usertype = request.form['usertype']
        IorE = request.form['IorE']
        TorS = request.form['TorS']
        MorS = request.form['MorS']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM GUIDEU WHERE username = % s', (username, ))
        account = cursor.fetchone()
        if account:
            msg = 'Account already exists !'
        else:
            cursor.execute('INSERT INTO GUIDEU VALUES (NULL, % s, % s, % s, % s, % s, % s, % s, % s, % s, % s, % s)', (username, password, usertype, firstname, lastname, bio, department, certification, IorE, TorS, MorS))
            mysql.connection.commit()
            msg = 'You have successfully registered'
            return render_template('login.html', msg = msg, username=username)
    return render_template('register.html', msg = msg)


# App route directory


# App route profile


# App route logout



if __name__ == '__main__':
    app.run(debug=True, port=8080)