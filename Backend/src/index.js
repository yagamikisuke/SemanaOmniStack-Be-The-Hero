const express = require('express');
const cors = require('cors'); //módulo de segurança
const routes = require('./routes');
const app = express();

app.use(cors()); //Da forma que está, toda aplicação front-end poderá acessar a aplicação, mas se definida a origin em um objeto passado como parâmetro, apenas essa origgem poderá acessar.
app.use(express.json()); //Informando o express que as requições que tem corpo são do formato JSON para ele converter para um objeto JS
app.use(routes);


app.listen(3333);