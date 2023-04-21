const mysql = require("mysql2")
const dotenv = require("dotenv")

dotenv.config()

const sqlModel = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : '9576',
    database : 'myDatabase'
})

sqlModel.connect((err) => {
    if (err) { console.log(err.message) }
    else { console.log("MySQL Connected") }
})

module.exports = { sqlModel }