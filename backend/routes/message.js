const express = require("express");

const {
  getAllMessagesByConversationId,
  createMessage,
  deleteMessage
  
} = require("../controllers/message.controller");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all conversation routes
router.use(requireAuth);

// GET all conversation messages
router.get("/:conversationId", getAllMessagesByConversationId); // Specify the conversation ID parameter

// POST message
router.post("/", createMessage )

// POST message
router.delete("/:messageId", deleteMessage )



module.exports = router;
