var express = require('express');
var cors = require('cors')
var userRouter = require('./routes/userActions')
var itemRouter = require('./routes/items')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use('/user', userRouter);
app.use('/api/items', itemRouter);


app.listen(9002, () =>{
    console.log("Be started at port 9002")
})

//"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"

