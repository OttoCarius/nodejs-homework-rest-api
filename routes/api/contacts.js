const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactID,
  updateFavoriteSchema,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate } = require("../../middelwares");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(listContacts));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(getContactById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(removeContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateFavoriteSchema)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(updateContactID)
);

module.exports = router;
