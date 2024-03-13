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
