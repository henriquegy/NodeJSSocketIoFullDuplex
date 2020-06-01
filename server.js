const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, resp)=>{
	resp.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
	console.log('New conn id: ', socket.id);

	socket.on('msg', (msg)=>{
		console.log(msg);

		console.log(JSON.stringify(obj));

		socket.emit('msg', obj);
	});
})

http.listen(1023, function(){
	console.log('Listening port 1023');
})