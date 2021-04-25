const express = require("express")
const router = express.Router()
const Department = require("../controllers/department")

router.get("/", Department.all)

router.get("/:id", Department.department)

router.post("/", Department.create)

router.put("/", Department.update)

router.delete("/:id", Department.delete)

router.post("/search", Department.search)

module.exports = router;