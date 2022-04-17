const router = require("express").Router();
const {
  getAllFaculty,
  getSingleFaculty,
  createFaculty,
  deleteFaculty,
  loginFaculty,
  followFaculty,
  editFaculty,
} = require("../controllers/faculty");

// Get all faculty
router.get("/", getAllFaculty);

// Get single faculty by ID
router.get("/:id", getSingleFaculty);

// Create faculty
router.post("/", createFaculty);

// Delete Faculty using ID
router.delete("/:id", deleteFaculty);

// Login user using email and password
router.post("/login", loginFaculty);

// Follow faculty using faculty id
router.post("/follow/:id", followFaculty);

// Edit faculty details
router.put("/:id", editFaculty);

module.exports = router;
