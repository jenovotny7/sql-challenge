const mysql = require ('mysql');
const util = require ('util')

const connection = mysql.createConnection({
    host:"localhost",
    port: 3001,
    user:"root",
    password: "Matthew77",
    database: "employee_trackerDB",
    multipleStatements: true


    

});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;