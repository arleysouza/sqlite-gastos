
const router = require("express").Router();
const { GastoController } = require("../controllers");
const { create, update, list, remove } = new GastoController();

router.post("/", create);

router.put("/", update);

router.get("/",list);

router.delete("/", remove);
router.use( (req, res) => {
	res.status(400).json({error:["Operação desconhecida com o usuário"]});
});
module.exports = router;
