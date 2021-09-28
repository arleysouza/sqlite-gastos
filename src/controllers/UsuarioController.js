const { UsuarioModel } = require("../models");

class UsuarioController{
	async create(req, res) {
		let { mail, senha } = req.body;
		mail = (mail || "").toString().trim();
		senha = (senha || "").toString().trim();

		return await UsuarioModel.create({ mail, senha })
			.then(async (r) => {
				const { idusuario, mail, senha } = r.get();
				return res.status(200).json({ idusuario, mail, senha });
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async update(req, res) {
		let { idusuario, mail, senha } = req.body;
		idusuario = (idusuario || "").toString().trim();
		mail = (mail || "").toString().trim();
		senha = (senha || "").toString().trim();

		return await UsuarioModel.findOne({ where: { idusuario } })
			.then(async (usuario) => {
				if (usuario) {
					await usuario.update({ mail, senha });
					return res.status(200).json({ idusuario, mail, senha });
				}
				return res.status(400).json({ error: ["Usuário não identificado"] });
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async list(req, res) {
		return await UsuarioModel.findAll({
			attributes: ["idusuario", "mail"],
			order: [["mail", "ASC"]],
		})
			.then((usuarios) => {
				return res
					.status(200)
					.json({ usuarios: usuarios.map((item) => item.get()) });
			})
			.catch((e) => {
				return res.status(400).json({ error: [e.message] });
			});
	}

	async remove(req, res) {
		let { idusuario } = req.body;
		idusuario = (idusuario || "").toString().trim();

		return await UsuarioModel.findOne({ where: { idusuario } })
			.then(async (usuario) => {
				if (usuario !== null) {
					await usuario.destroy();
					return res.status(200).json({ idusuario });
				} else {
					return res.status(400).json({
						error: ["Usuário não identificado"],
					});
				}
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}
}

module.exports = UsuarioController;
