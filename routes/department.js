const express = require("express")
const router = express.Router()
const Department = require("../controllers/department")

// All Departments Route
router.get("/", Department.all)

// A Department Route
router.get("/:id", Department.department)

// Create Department Route
router.post("/", Department.create)

// Update Department Route
router.put("/", Department.update)

// Delete Department Route
router.delete("/:id", Department.delete)

// Search Department Route
router.post("/search", Department.search)

module.exports = router;