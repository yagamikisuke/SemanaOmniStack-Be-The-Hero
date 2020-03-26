
exports.up = function(knex) { //Script de criação/update
  return knex.schema.createTable('ongs', function(table){ //Cria a table e passa como função os campos que farão parte da mesma
    table.string('id').primary(); //cria um ID do tipo string como chave primária
    table.string('name').notNullable(); //cria um campo do tipo string que não pode ser vázio/nulo
    table.string('email').notNullable(); //cria um campo do tipo string que não pode ser vázio/nulo
    table.string('whatsapp').notNullable(); //cria um campo do tipo string que não pode ser vázio/nulo
    table.string('city').notNullable(); //cria um campo do tipo string que não pode ser vázio/nulo
    table.string('uf', 2).notNullable(); //cria um campo do tipo string que não pode ser vázio/nulo com apenas dois caracteres
  });
};

exports.down = function(knex) { //Script de rollback
  return knex.schema.dropTable('ongs'); //Exclui a tabela passada com parâmetro
};
