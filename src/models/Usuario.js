const Sequelize = require("sequelize");
const database = require("../database");

const Usuario = database.define("usuario",{
	idusuario: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	mail: {
		type: Sequelize.STRING,
		allowNull: null,
		unique: {
			args: true,
			msg: "O e-mail já existe no cadastro"
		},
		validate:{
			isEmail:{
				args: true,
				msg: "Forneça um e-mail válido"
			}
		}
	},
	senha: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			min:{
				args:[6],
				msg:"A senha deve ter pelo menos 6 caracteres"
			}
		}
	}
},
{
	freezeTableName: true
});


module.exports = Usuario;


