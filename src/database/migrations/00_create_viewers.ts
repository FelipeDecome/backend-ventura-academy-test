import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('viewers', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.unique(['email']);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('sessions');
}
