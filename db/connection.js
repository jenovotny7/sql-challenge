// you must enter your own password SQL password into the password section
const util = require ('util')
const mysql = require ('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password: "Matthew77",
    database: "employee_trackerDB",
    multipleStatements: true


    

});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;