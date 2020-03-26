const express = require('express');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionControler = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Rota/Recurso
 */

/**
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Altear uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviado na rota após o sinal de interrogação (Filtros, paginação)
 * Route Params: Parêmtros usados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * SQL: MySQL, SQLite, PostfreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */


// routes.post('/ongs', async (request, response) => {
    
    //     /*
    //     const params = request.query; //Contém os dados da requição do tipo Query Param
    //     const params = request.params //Contém os dados da requição do tipo Route Param
    //     const body = request.body //Contém os dados passados em requição que contenha um corpo. Preciso passar para o express a informação que estaremos usando json nas requições para que ele faça o parse para um objeto JS
    
    //     console.log(body);
    //     */
    
    // });
    routes.post('/sessions', sessionControler.create);
    routes.get('/ongs', ongController.index);
    routes.post('/ongs', ongController.create);

    routes.get('/profile', profileController.index);

    routes.get('/incidents', incidentController.index);
    routes.post('/incidents', incidentController.create);
    routes.delete('/incidents/:id', incidentController.delete);
    
    module.exports = routes;