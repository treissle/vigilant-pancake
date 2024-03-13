from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)
app.secret_key = 'cactus'

app.config['MYSQL_HOST'] = '107.180.1.16'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'spring2024Cteam10'
app.config['MYSQL_PASSWORD'] = 'spring2024Cteam10'
app.config['MYSQL_DB'] = 'spring2024Cteam10'
mysql = MySQL(app)

@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM XXXXXXX WHERE username = %s AND password = %s', (username, password))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            session['type'] = account['type']
      
            session['user_data'] = {
                'XXXX': account['XXXX'],
                'XXXX': account['XXXX']
            }
            
            if session['type'] == 'mentor':
                return redirect(url_for('mentor'))
            elif session['type'] == 'mentee'
                return redirect(url_for('mentee'))
            
        else:
            msg = 'Incorrect username/password!'
            return render_template('login.html', msg=msg)
    return render_template('login.html', msg='')



if __name__ == '__main__':
    app.run(debug=True, port=8080)