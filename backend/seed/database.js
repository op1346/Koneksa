'use strict';

const Context = require('./context');

class Database {
  constructor(seedData, enableLogging) {
    this.formData = seedData.formData;
    this.enableLogging = enableLogging;
    this.context = new Context('tasklist.db', enableLogging);
  }

  log(message) {
    if (this.enableLogging) {
      console.info(message);
    }
  }

  tableExists(tableName) {
    this.log(`Checking if the ${tableName} table exists...`);

    return this.context
      .retrieveValue(`
        SELECT EXISTS (
          SELECT 1
          FROM sqlite_master
          WHERE type = 'table' AND name = ?
        );
      `, tableName);
  }

  createFormData(formDatum) {
    return this.context
      .execute(`
        INSERT INTO Tasks
          (id, name, password, birthday, preferences: {techPref, pizzaToppings, timezone})
        VALUES
          (?, ?, ?, datetime(), ?:{?, ?, ?});
      `,
      formDatum.id,
      formDatum.name,
      formDatum.password,
      formDatum.birthday,
      formDatum.preferences.techPref,
      formDatum.preferences.pizzaToppings,
      formDatum.preferences.timezone
      );
  }

  async createFormData(formDatum) {
    for (const formDatum of formData) {
      await this.createTask(formDatum);
    }
  }

    const taskTableExists = await this.tableExists('FormData');

    if (taskTableExists) {
      this.log('Dropping the FormData table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Tasks;
      `);
    }

    this.log('Creating the FormData table...');

    await this.context.execute(`
      CREATE TABLE FormData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name string NOT NULL DEFAULT '',
        password string NOT NULL DEFAULT '',
        birthday string NOT NULL DEFAULT '',
        preferences.techPref string NOT NULL DEFAULT '',
        preferences.pizzaToppings string NOT NULL DEFAULT '',
        preferences.timezone string NOT NULL DEFAULT ''
      );
    `);

    this.log('Creating the formDatum records...');

    await this.createformData(this.formData);

    this.log('Database successfully initialized!');
  }
}

module.exports = Database;
