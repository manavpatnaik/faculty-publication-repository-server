const Archive = require("../models/Archive");
const User = require("../models/User");
const Publication = require("../models/Publication");

exports.getArchiveItems = async (req, res) => {
  const archiveItems = await Archive.find();
  return res.status(200).send({
    success: true,
    data: archiveItems,
  });
};

exports.archivePublication = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const _user = await User.findById(user);
  if (_user.role !== "ADMIN")
    return res.status(401).send({
      success: false,
      message: "Only Admins can archive publications",
    });
  await Publication.findByIdAndUpdate(id, {
    archived: true,
  });
  const _archiveItem = new Archive({ publication: id });
  await _archiveItem.save();
  return res.status(200).send({ success: true, data: _archiveItem });
};

exports.retrievePublicationFromArchive = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const _user = await User.findById(user);
  if (_user.role !== "ADMIN")
    return res.status(401).send({
      success: false,
      message: "Only Admins can retrieve publications from archive",
    });
  await Publication.findByIdAndUpdate(id, {
    archived: false,
  });
  const _archiveItem = await Archive.findOneAndDelete({ publication: id });
  return res.status(200).send({ success: true, data: _archiveItem });
};
