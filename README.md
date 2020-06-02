# NodeJS Socket.io(Full-Duplex)
NodeJS comandando conexão Full-Duplex com socket.io no servior e na pagina html com JavaScript puro.

Arquivos importantes:

	- server.js
	- index.html

## server.js

Servidor node.js onde uso as bibliotécas:

```javascript
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
```

Express - Já é bem conhecido, mas, para quem não conhece essa biblioteca é responsavel por encapsular rotas e outras vantagens de
um servidor http.

Http - Essa bibliotéca é nescessária para que a socket.io funcione corretamente.

Socket.io - por fim a socket.io que encapsua http para conseguir fazer a conexão Full-Duplex com o arquivo html.

```javascript
app.get('/', (req, resp)=>{
	resp.sendFile(__dirname + '/index.html')
})
```

Serve o arquivo index.html na requisição da url no browser.

```javascript
http.listen(1023, function(){
	console.log('Listening port 1023');
})
```

Notem que uso app da biblioteca express para encapsular o verbo http GET, e para camar o servidor é usado a própria bibliotéca
http. Http só vai server como o inicializador do servidor e como base para Express e Socket.io.

```javascript
io.on('connection', (socket)=>{
	console.log('New conn id: ', socket.id);

	socket.on('msg', (msg)=>{
		console.log(msg);

		console.log(JSON.stringify(obj));

		socket.emit('msg', obj);
	});
})
```

Nesta função ***io.on('connection', (socket)=>{...}*** é onde o socket fica ouvindo as requisições do cliente e dentro do podemos
manipular as mensagens de forma individual e enviar a resposta para o cliente com o método emit. Para mais detalhes sobre
socket.io acesse o site https://socket.io/get-started/chat/.

## index.html

No lado do cliente procurei usar JavaScript puro para demonstrar o poder nativo de socket.io.

```javascript
<script src="/socket.io/socket.io.js"></script>
<script>
	const socket = io();

	socket.on('connect', () => {
		console.log(socket.id);

		socket.emit('msg', 'dados');
	});

	socket.on('msg', (data) => {
		console.log(JSON.parse(data));
	});
</script>
```
  
  Quando você serve uma página html diretamente do servidor é obrigatório informar ***src="/socket.io/socket.io.js"*** na tag script
  é uma forma de o arquivo html do cliente fazer um handshake(aperto de mãos) com o servidor e os dois conseguirem se comunicar.
  
  Inicie seu objeto socket.io com ***const socket = io();*** sempre.
  
  E por fim uso dois métodos on um para estabelecer uma conexão com o servidor e o outro para houvir o que o servidor manda de
  mensagem através de msg. Dentro do método connect eu uso o método emit para mandar a mensagem para o servidor. Vale resaltar
  que todos esses métodos são assincrolos ou seja são promisses.
  
  É isso ai, espero ter ajudado a clarear o caminho para entender a api do [socket.io](https://socket.io/get-started/chat/).
  
  Bons estudos!
