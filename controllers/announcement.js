const Announcement = require("../models/Announcement");

exports.getAnnouncements = async (req, res) => {
  const announcements = await Announcement.find();
  return res.status(200).send({ success: true, data: announcements });
};

exports.makeAnnouncement = async (req, res) => {
  const { body } = req.body;
  const announcement = new Announcement({ body });
  await announcement.save();
  return res.status(200).send({ success: true, data: announcement });
};

exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  const announcement = await Announcement.findByIdAndDelete(id);
  return res.status(200).send({ success: true, data: announcement });
};
