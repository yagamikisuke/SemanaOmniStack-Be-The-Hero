const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        const { page=1 } = request.query;
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //junta duas tabelas, onde deterinada contição, for igual, a condição passada
            .limit(5) //limita o número de resultados
            .offset((page - 1)*5) //pula um número de ocorrencias a cada requisição
            .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'); //nomeia os campos que devem ser selecionados e trazidos no resultado

        const [count] = await connection('incidents').count();

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){

        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}