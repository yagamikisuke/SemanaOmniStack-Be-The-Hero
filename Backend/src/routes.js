const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionControler = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', sessionControler.create);
routes.get('/ongs', ongController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.index);

routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete);

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

module.exports = routes;