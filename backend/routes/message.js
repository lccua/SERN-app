const express = require("express");

const {
  getAllMessagesByConversationId
} = require("../controllers/message.controller");

const requireAuth = require("../middleware/requireAuth");


const router = express.Router();

// require auth for all conversation routes
router.use(requireAuth);

// GET all conversation messages
router.get("/:conversationId", getAllMessagesByConversationId); // Specify the conversation ID parameter

module.exports = router;
