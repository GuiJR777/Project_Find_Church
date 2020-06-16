import Knex from 'knex';

export async function up(knex: Knex){
    //criar tabela
    return knex.schema.createTable('point_types', table =>{
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

            
        table.integer('type_id')
            .notNullable()
            .references('id')
            .inTable('types');


    })
}


export async function down(knex:Knex){
    //deletar tabela
   return knex.schema.dropTable('point_types');
}