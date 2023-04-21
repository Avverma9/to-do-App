const express = require("express")
const app = express()
const multer = require("multer")
const route = require("./route/route")
const cors = require("cors")

app.use(express.json())
app.use(multer().any())
app.use(cors({origin:"*"}))


app.use("/", route)


app.listen(8080, () => console.log("Server is ready to boom on port 8080"))