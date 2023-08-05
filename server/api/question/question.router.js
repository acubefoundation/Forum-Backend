const router = require("express").Router();
const {AskQuestion,allquestion,questionById}=require("./question.controller");
// const auth=require("../Middleware/auth")

router.post("/",AskQuestion);
router.get("/all", allquestion);
router.get("/:post_id", questionById);

module.exports=router;