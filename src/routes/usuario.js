const router = require("express").Router();
const { UsuarioController } = require("../controllers");

const { create, update, list, remove } = new UsuarioController();

router.post("/", create);
router.put("/", update);
router.delete("/", remove);
router.get("/", list);

module.exports = router;
