const Sequelize = require("sequelize");
const database = require("../database");

const UsuarioModel = require("./Usuario");

const Gasto = database.define("gasto",{
	idgasto: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	descricao: {
		type: Sequelize.STRING,
		allowNull: null
	},
	valor: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	idusuario: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: UsuarioModel,
			key: "idusuario"
		},
		onDelete: "cascade",
		onUpdate: "cascade",
		hooks: true,
		validate: {
			notEmpty: {
				//valida se foi fornecido o idusuario
				args: true,
				msg: "Forneça a identificação do usuário",
			},
			foreignkey: async (idusuario, next) => {
				//verifica se o idusuario existe na tabela usuario
				const usuario = await UsuarioModel.findOne({ where: { idusuario } });
				if (usuario === null) {
					return next(`O usuário ${idusuario} não foi localizado`);
				}
				return next();
			},
		},
	}
},
{
	freezeTableName: true
});


module.exports = Gasto;


