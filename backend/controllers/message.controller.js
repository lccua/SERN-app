const messageService = require("../services/message.service");
const { ErrorHandler } = require("../helpers/error.helper");

// get all conversation messages
const getAllMessagesByConversationId = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const messages = await messageService.getAllMessagesByConversationId(conversationId);
    res.status(200).json(messages);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

// saves a new message
const createMessage = async (req, res) => {
  try {
    const { conversationId, messageContent, isFuture } = req.body;
    const message = await messageService.createMessage({ conversationId, messageContent, isFuture });
    res.status(200).json(message);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

// deletes a message
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    console.log(messageId);
    const deletedMessage = await messageService.deleteMessage(messageId);
    res.status(200).json(deletedMessage);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

module.exports = {
  getAllMessagesByConversationId,
  createMessage,
  deleteMessage
};
