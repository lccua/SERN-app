const express = require("express");

const {
  getAllConversations,
  createConversation,
  deleteConversation,
  updateConversation,
} = require("../controllers/conversation.controller");

const requireAuth = require("../middleware/requireAuth");


const router = express.Router();

// require auth for all conversation routes
router.use(requireAuth);

// GET all conversation
router.get("/", getAllConversations);

// POST a new conversation
router.post("/", createConversation);

// DELETE a conversation
router.delete("/:id", deleteConversation);

// UPDATE a conversation
router.patch("/:id", updateConversation);

module.exports = router;
