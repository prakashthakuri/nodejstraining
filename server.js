var express = require('express')
var bodyParser = require('body-parser')
const { add } = require('lodash')
const { socket } = require('dgram')

var app = express()

var http = require('http').Server(app)
var io = require('socket.io')(http)

var mongoose = require('mongoose')

app.use(express.static(__dirname)) // hosting a static file from index.html
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://cluster0.ukcpx.mongodb.net/nodejsessential'
var Message = mongoose.model('Message' , {

    name: String,
    message: String
})


app.get('/messages', (req,res) => {
    Message.find({}, (err, messages)=> {


    })
    res.send(messages)
})

app.post('/messages', (req,res) => {
    console.log(req.body)
    var message = new Message(req.body)

    messages.save((err) => {
        if(err){
            sendStatus(500)

        Message.findOne({message: 'badword'}, (err, cesored) => {
            if(censored){
                console.log('censored word found', censored)
            }
        })

        io.emit('message',req.body)
        res.sendStatus(200)
        
        }
    })
    messages.push(req.body)
    io.emit('message',req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, {useMongoClient: true}, (err) => {
    console.log('mongodb connection', err)
})

var server =http.listen(3000, () => {
    console.log("Server is listening on port", server.address().port)
})

