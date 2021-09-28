//importa o arquivo database/index.js
const database = require("../database");
//cria as tabelas no SGBD se elas não existirem
database.sync();

module.exports = {
	GastoModel: require("./Gasto"),
	UsuarioModel: require("./Usuario")
};