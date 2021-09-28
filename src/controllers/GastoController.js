const { GastoModel } = require("../models");

class GastoController {
	async create(req, res) {
		let { idusuario, descricao, valor } = req.body;
		idusuario = (idusuario || "").toString().trim();
		descricao = (descricao || "").toString().trim();
		valor = (valor || "").toString().trim();

		return await GastoModel.create({ idusuario, descricao, valor })
			.then(async (r) => {
				const { idgasto, idusuario, descricao, valor } = r.get();
				return res.status(200).json({ idgasto, idusuario, descricao, valor });
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
		let { idgasto, idusuario, descricao, valor } = req.body;
		idgasto = (idgasto || "").toString().trim();
		idusuario = (idusuario || "").toString().trim();
		descricao = (descricao || "").toString().trim();
		valor = (valor || "").toString().trim();

		return await GastoModel.findOne({ where: { idgasto } })
			.then(async (gasto) => {
				if (gasto) {
					await gasto.update({ idusuario, descricao, valor });
					return res.status(200).json({ idgasto, idusuario, descricao, valor });
				}
				return res.status(400).json({ error: ["Gasto não identificado"] });
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
		return await GastoModel.findAll({
			attributes: ["idgasto", "idusuario", "descricao", "valor"],
			order: [["idgasto", "ASC"]],
		})
			.then((gastos) => {
				return res
					.status(200)
					.json({ gastos: gastos.map((item) => item.get()) });
			})
			.catch((e) => {
				return res.status(400).json({ error: [e.message] });
			});
	}

	async remove(req, res) {
		let { idgasto } = req.body;
		idgasto = (idgasto || "").toString().trim();

		return await GastoModel.findOne({ where: { idgasto } })
			.then(async (gasto) => {
				if (gasto !== null) {
					await gasto.destroy();
					return res.status(200).json({ idgasto });
				} else {
					return res.status(400).json({
						error: ["Gasto não identificado"],
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

module.exports = GastoController;
