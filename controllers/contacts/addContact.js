const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const data = req.body;
  const result = await Contact.create({ ...data, owner });
  res.status(201).json(result);
};

module.exports = addContact;
