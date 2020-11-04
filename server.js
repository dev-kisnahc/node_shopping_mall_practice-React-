const express = require("express")
const mongoose = require("mongoose")

const app = express()

//config 비밀설정
const config = require("./config/dev.js")


//middleware
const bodyParser = require("body-parser")
const Logger = require("morgan")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(Logger('dev'))

//database
dbAddress = (config.mongoURI)
dbOpion = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
    .connect(dbAddress, dbOpion)
    .then(() => console.log("DB connected ... "))
    .catch(err => console.log(err))


//routing
const userRoute = require("./route/User")
const productRoute = require("./route/product")


app.use('/User', userRoute)
app.use('/product', productRoute)


const PORT = 1234

app.listen(PORT, () => console.log("server started"))
