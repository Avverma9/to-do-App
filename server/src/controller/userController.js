const { sqlModel } = require("../mysql")

const jwt = require("jsonwebtoken");





function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return re.test(email);
}




const createUser = async (req, res) => {

    try {
        let data = req.body;
        console.log(data)

        let { name, email, password } = data

        let files = req.files;

        if (!email) { return res.status(400).send({ status: false, message: "Please enter email" }) }

        if (!validateEmail(email)) { return res.status(400).send({ status: false, message: "Please enter a valid Email" }) }

       

        let qry = `insert into todouser (name, email, password, profile) values ('${name}', '${email}', '${password}', '${profile}' )`

        sqlModel.query(qry, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                return res.status(201).send({ status: true, data: data })
            }
        })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}





const userLogin = async function (req, res) {

    try {
        let data = req.body
        let { email, password } = data

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter email and Password to Login" }) }

        if (!email) { return res.status(400).send({ status: false, message: "Please enter your email" }) }
        if (!password) { return res.status(400).send({ status: false, message: "Please enter password" }) }

        if (!validateEmail(email)) { return res.status(400).send({ status: false, msg: "Please enter a valid Email" }) }

        let qry = `select * from todouser where email='${email}'`

        sqlModel.query(qry, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                if(data.length==0){ return res.status(404).send({ status: false, message: "User not found !" }) }
    
                if (data[0].password != password) { return res.status(400).send({ status: false, message: "Please enter a correct Password" }) }
                let token = jwt.sign({ id: data[0].id, email: email }, "todo web app")
                return res.status(200).send({ status: true, data: { token: token, user: data[0] } })
            }
        })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}






const getUser = (req, res) => {

    try {
        let id = req.params.id

        let qry = `select * from todouser where id=${id}`

        sqlModel.query(qry, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                return res.status(200).send({ status: true, data: data[0] })
            }
        })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



const updateUser = async (req, res) => {

    try {
        let data = req.body
        let id = req.params.id
        let files = req.files

        let { name, email, password } = data

        let qry = "update todouser set"

        if(name){qry+= ` name='${name}'`}

        if(email){
            if(name){qry+=","}
            qry+= ` email='${email}'`
        }

        if(password){
            if(name||email){qry+=","}
            qry+= ` password='${password}'`
        }
        
        if (files.length>0) {
            if(name||email||password){qry+=","}
            qry+= ` profile= '${await uploadFile(files[0])}'`
        }

        qry+=` where id=${id}`

        sqlModel.query(qry, (err, data)=>{
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                return res.status(200).send({ status: false, message: data }) }
            }
        )

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createUser, getUser, userLogin, updateUser }