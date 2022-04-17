const {
  getAnnouncements,
  makeAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcement");

const router = require("express").Router();

router.get("/", getAnnouncements);

router.post("/", makeAnnouncement);

router.delete('/:id', deleteAnnouncement)

module.exports = router;
