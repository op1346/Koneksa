'use strict';

const Context = require('./context');

class Database {
  constructor(seedData, enableLogging) {
    this.formDatas = seedData.formDatas;
    this.enableLogging = enableLogging;
    this.context = new Context('form.db', enableLogging);
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

  createFormData(formData) {
    return this.context
      .execute(`
        INSERT INTO FormDatas
          (id, name, password, birthday, techPref, pizzaToppings, timezone)
        VALUES
          (?, ?, ?, ?, ?, ?, ?);
      `,
      formData.id,
      formData.name,
      formData.password,
      formData.birthday,
      formData.techPref,
      formData.pizzaToppings,
      formData.timezone
      );
  }

  async createFormDatas(formDatas) {
    for (const formData of formDatas) {
      await this.createFormData(formData);
    }
  }

  async init() {
    const formDataTableExists = await this.tableExists('FormDatas');

    if (formDataTableExists) {
      this.log('Dropping the FormDatas table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS FormDatas;
      `);
    }

    this.log('Creating the FormDatas table...');

    await this.context.execute(`
      CREATE TABLE FormDatas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING NOT NULL DEFAULT '',
        password STRING NOT NULL DEFAULT '',
        birthday STRING NOT NULL DEFAULT '',
        techPref STRING NOT NULL DEFAULT '',
        pizzaToppings STRING NOT NULL DEFAULT '',
        timezone STRING NOT NULL DEFAULT ''
      );
    `);

    this.log('Creating the FormDatas records...');

    await this.createFormDatas(this.formDatas);

    this.log('Database successfully initialized!');
  }
}

module.exports = Database;
