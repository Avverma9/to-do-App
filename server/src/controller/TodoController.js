
const { sqlModel } = require("../mysql")
const { v4: uuidv4 } = require('uuid');

const createTask = async (req, res) => {
    try {
        let data = req.body;
        let userId = req.params.userId

        const { task, status, date, time } = data

        if (!['done', 'pending', 'in progress', 'completed'].includes(status)) { return res.status(400).send({ status: false, message: "Please enter a valid status ('done', 'pending', 'in progress', 'completed')" }) }

        let id = uuidv4()

        let qry = `insert into todo values ('${id}', ${userId}, '${task}', '${status}', '${date}', '${time}')`

        sqlModel.query(qry, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                console.log(data)
                return res.status(201).send({ status: true, data: data })
            }
        })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


const getTask = async (req, res) => {

    try {
        let date = req.query.date;

        let userId = req.params.userId

        let qry = `select * from todo where userId=${userId} and date='${date}'`

        sqlModel.query(qry, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                return res.status(200).send({ status: true, data: data })
            }
        })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




const updateTask = async (req, res) => {

    try {

        let data = req.body;
        let id = req.params.id

        const { status } = data

        let qry = `update todo set`

        if (!['done', 'pending', 'in progress', 'completed'].includes(status)) { return res.status(400).send({ status: false, message: "Please enter a valid status ('done', 'pending', 'in progress', 'completed')" }) }
        qry += ` status='${status}'`

        qry += ` where id='${id}'`

        sqlModel.query(qry, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                return res.status(200).send({ status: false, message: data })
            }
        })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


const deleteTask = async (req, res) => {
    try {
        let id = req.params.id

        let qry = `delete from todo where id='${id}'`

        sqlModel.query(qry, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                return res.status(200).send({ status: false, message: data })
            }
        }
        )

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createTask, getTask, updateTask, deleteTask }