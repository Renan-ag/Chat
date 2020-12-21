/*importação dos frameworks*/
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const validator = require('express-validator');

// Inciando o express 
const app = express();

// Setar as variaveis que a 'view engine' e 'views' do express

app.set('view engine', 'ejs');
app.set('views','./app/views');

// configurar  o middleware(Tecnologias intermediarias) express static
app.use(express.static('./app/public'));

// configurar  o middleware body-parser
app.use(bodyParser.urlencoded({extended:true}));

// configurar o middleware express validator
app.use(validator())

//efetua o auto-load da rotas, models e controllers pro obj app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//Exportação
module.exports = app;