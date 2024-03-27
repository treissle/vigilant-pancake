function login() {
    window.alert("login");
    window.location.href = "401k/401k.html";
  }
  
  function register() {
    window.alert("register");
  
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const bio = document.getElementById("bio").value;
    const department = document.getElementById("department").value;
    const certifications = document.getElementById("multipleCheckbox").value;
    var checkedCertifications = [];
    var checkboxes = document.querySelectorAll('#multipleCheckbox input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkedCertifications.push(checkbox.id);
      }
    });
    const role = document.querySelector('input[name="role"]:checked').value;
    const personality = document.querySelector('input[name="personality"]:checked').value;
    const personality2 = document.querySelector('input[name="personality2"]:checked').value;
    const personality3 = document.querySelector('input[name="personality3"]:checked').value;
  
    // Print the values in the console
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log(`Bio: ${bio}`);
    console.log(`Department: ${department}`);
    console.log("Checked certifications:", checkedCertifications);
    console.log(`Role: ${role}`);
    console.log(`Personality: ${personality}`);
    console.log(`Personality2: ${personality2}`);
    console.log(`Personality3: ${personality3}`);
    
    
    const mysql = require("mysql");
  
    // Create a connection to the MySQL database
    const connection = mysql.createConnection({
      host: "107.180.1.16",
      port: "3306",
      user: "spring2024Cteam10",
      password: "spring2024Cteam10",
      database: "spring2024Cteam10",
    });
  
    // Connect to the database
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database: ", err);
        return;
      }
      console.log("Connected to MySQL database");
    });
  
    const newAccount = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
  
    connection.query("INSERT INTO 401K SET ?", newAccount, (err, results) => {
      if (err) {
        console.error("Error inserting record: ", err);
        return;
      }
      console.log("Account successfully created");
    });
  
    connection.end();
  
    window.location.href = "index.html";
  }
  
  
  