var express = require('express')
var bodyParser = require('body-parser')
const { add } = require('lodash')
const { socket } = require('dgram')

var app = express()

var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname)) // hosting a static file from index.html
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


var messages = [

    {name:'Prakash', message: "Hello"},
    {name: 'Anamol', message: "Hi"}
]
app.get('/messages', (req,res) => {
    res.send(messages)
})

app.post('/messages', (req,res) => {
    console.log(req.body)
    messages.push(req.body)
    io.emit('message',req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})


var server =http.listen(3000, () => {
    console.log("Server is listening on port", server.address().port)
})

