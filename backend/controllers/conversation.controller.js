const conversationService = require("../services/conversation.service");
const { ErrorHandler } = require("../helpers/error.helper");



// get all conversations
const getAllConversations = async (req, res) => {
  try {

    const userId = req.user.id; // Assuming req.user has the user ID

    const conversations = await conversationService.getAllConversations( userId );
    
    res.status(200).json(conversations);

  }
  catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }

};




// create new conversation
const createConversation = async (req, res) => {
  
  try {

    const userId = req.user.id; // Assuming req.user has the user ID


    const conversation = await conversationService.createConversation(  userId  );

    res.status(200).json(conversation);

  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }

};

// delete a conversation
const deleteConversation = async (req, res) => {

  try {
    
    const { conversationId } = req.params;
    
    const conversation = await conversationService.deleteConversation( conversationId );
    
    res.status(200).json(conversation);

  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  };

}

// update a conversation
const updateConversation = async (req, res) => {
  try {

    const { conversationId } = req.params;
    const updatedConversation = { ...req.body }
    
    const conversation = await conversationService.updateConversation( {conversationId, updatedConversation} );


    res.status(200).json(conversation);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

module.exports = {
  getAllConversations,
  createConversation,
  deleteConversation,
  updateConversation
};
