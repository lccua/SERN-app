const messageService = require("../services/message.service");
const { ErrorHandler } = require("../helpers/error.helper");



// get all conversation messages
const getAllMessagesByConversationId = async (req, res) => {
  try {

    const conversationId = req.params.conversationId; // Assuming conversationId is part of the route parameters

    const messages = await messageService.getAllMessagesByConversationId( conversationId );
    
    res.status(200).json(messages);

  }
  catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }

};


module.exports = {
  getAllMessagesByConversationId
};
