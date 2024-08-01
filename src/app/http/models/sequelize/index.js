"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Connections = require("@simplicityjs/framework/connections");
const config = require("../../../../config");

const db = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(f => f.indexOf(".") !== 0 && f !== basename && f.slice(-3) === ".js")
  .forEach(file => {
    let connectionName;
    const modelClass = require(path.join(__dirname, file));
    const supportedDrivers = ["mariadb", "memory", "mysql", "sqlite", "postgres"];

    connectionName = modelClass.connection?.toLowerCase() || "default";

    if(connectionName === "default") {
      connectionName = config.get("database.default");
    }

    if(!supportedDrivers.includes(connectionName)) {
      throw new TypeError(
        `Unsupported driver '${connectionName}' ` +
        `declared for '${modelClass}.connection'. ` +
        `Supported drivers include ${supportedDrivers.join(", ")}.`
      );
    }

    const connectionConfig = config.get("database.connections")[connectionName];
    const sequelize = Connections.get(connectionName, connectionConfig);
    const model = sequelize.define(modelClass.table, modelClass.fields);

    model.sequelize = sequelize;

    db[modelClass.name] = model;
  });

/*
 * Ensure every model is available
 * before trying to create associations between models.
 */
Object.keys(db).forEach((modelName) => {
  if(typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

module.exports = db;
