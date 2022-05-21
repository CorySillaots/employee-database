const mysql = require("mysql"); 
const util = require("util"); 

const connection = mysql.createConnection({
    port: 3007,
    host     : 'localhost',
    user     : 'root',
    password : 'yeehaw876',
    database : 'employees',
  });
   
  connection.connect();

  connection.query = util.promisify(connection.query); 
    
 module.exports = connection; 