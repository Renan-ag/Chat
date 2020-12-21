module.exports.iniciaChat = function (application, req, res) {
    var dadosForm = req.body;

    req.assert('nome','Nome ou apelido é obrigatorio').notEmpty();
    req.assert('nome','Nome ou apelido deve ter entre 5 a 20 caracteres').len(5,20);
    
    var erros = req.validationErrors();
    
    if(erros){
        res.render("index",{validacao: erros});
        return;
    }

    application.get('io').emit('msgParaCliente', 
    {apelido: dadosForm.nome, mensagem: 'Acabou de entrar no chat'});

    res.render("chat", {dadosForm: dadosForm});
}