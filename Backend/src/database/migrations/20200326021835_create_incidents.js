
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments(); //cria um campo auto incrementável como chave primária

        table.string('title').notNullable(); //cria um coluna do tipo texto não nulo
        table.string('description'). notNullable(); //cria um coluna do tipo texto não nulo
        table.decimal('value').notNullable(); //cria um coluna de valor decimal não nulo

        table.string('ong_id').notNullable(); //cria a coluna que guardará a chave estrangeria

        table.foreign('ong_id').references('id').inTable('ongs'); //faz o relacionamento entre a coluna da tabela com a da outra tabela
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
