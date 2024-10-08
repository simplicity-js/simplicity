"use strict";

const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
const Connections = require("@simplicityjs/framework/connections");
const config = require("config");

const db = {};
const basename = path.basename(__filename);


function createModel(modelName, schema, connection) {
  if(mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  if(connection?.models[modelName]) {
    return connection.models[modelName];
  }

  return (connection
    ? connection.model(modelName, schema)
    : mongoose.model(modelName, schema)
  );
}

const modelFiles = fs.readdirSync(__dirname)
  .filter(f => f.indexOf(".") !== 0 && f !== basename && f.slice(-3) === ".js");

if(modelFiles.length > 0) {
  const connectionName = "mongodb";
  const connectionConfig = config.get("database.connections")[connectionName];
  const connection = Connections.get(connectionName, connectionConfig);

  modelFiles.forEach(file => {
    const modelFile = path.join(__dirname, file);
    const modelClass = require(modelFile);
    const modelSchema = require(modelFile).schema;
    const modelName = modelClass.name;
    const model = createModel(modelName, modelSchema, connection);

    db[modelClass.name] = model;
  });

  db.connection = connection;
}

module.exports = db;
