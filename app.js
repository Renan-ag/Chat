/*importação das configurações do servidor*/
var app = require('./config/server');
/*parametrizar a porta de escuta*/

var server = app.listen(80, () => {
    console.log("Servidor: Online");
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* Criar conexao web socket */

io.on('connection', (socket) => {
    console.log('Usuario conectou');

    socket.on('disconnect', () => {
        console.log('Usuario desconectou');
    });

    socket.on('msgParaServidor', (data)=>{
        socket.emit(
        'msgParaCliente',
        {apelido: data.apelido, mensagem:data.mensagem}
        );

        socket.broadcast.emit(
        'msgParaCliente',
        {apelido: data.apelido, mensagem:data.mensagem}
        );
        
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
        
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
        }
    })
});
