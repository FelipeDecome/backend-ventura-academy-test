import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('actions', (table) => {
        table.increments('id').primary();

        table.string('name').notNullable();
        table.timestamp('created_at').notNullable();

        table.integer('viewer_id').notNullable().references('id').inTable('viewers');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('actions');
}
