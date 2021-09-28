// importa o construtor Sequelize
const Sequelize = require("sequelize");
// cria uma instância com a conexão para o SQLite
// os dados estarão no arquivo database.db
const database = new Sequelize({
	dialect: "sqlite",
	storage: "database.db",
});
// exporta a instância para o BD
module.exports = database;