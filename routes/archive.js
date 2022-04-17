const router = require("express").Router();
const {
  getArchiveItems,
  archivePublication,
  retrievePublicationFromArchive,
} = require("../controllers/archive");

router.get("/", getArchiveItems);

router.post("/:id", archivePublication);

router.delete("/:id", retrievePublicationFromArchive);

module.exports = router;
