// mySql ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  database : 'db_main'
});
 
connection.connect();
 
connection.query('DELETE FROM Users WHERE username = *', function (error, results, fields) {
    if (error) throw error;
    console.log('Deleted all right?: ', results);
  });

connection.query('INSERT INTO Users (username) VALUES ("JoeJoe")', function (error, results, fields) {
    if (error) throw error;
});

connection.query('SELECT * FROM Users', function (error, results, fields) {
  if (error) throw error;
  console.log('The usernames are: ', results);
});
 
connection.end();