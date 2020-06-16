import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('types').insert([
        {title: 'Igreja', image: 'church.svg'},
        {title: 'Connect', image: 'connect.svg'},
        {title: 'Encontros', image: 'reuniao.svg'},
        {title: 'Célula', image: 'celula.svg'},
        {title: 'Estudo', image: 'estudo.svg'},
        {title: 'Institucionais', image: 'institucional.svg'}
    ])
}