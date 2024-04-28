const conversationDb = require("../db/conversation.db");
const { dateFormater } = require("../helpers/date.helper");
const { ErrorHandler } = require("../helpers/error.helper");
const { UUIDv4Generator } = require("../helpers/uuid.helper");


class ConversationService {

  async getAllConversations( userId ) {

    try {
      const conversations = await conversationDb.getAllConversations(userId);

      return conversations;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

 

  async createConversation( { userId } ) {

    try {

      const conversationId = UUIDv4Generator();
      const name =  dateFormater()

      const conversationData = { conversationId, name };

      const conversation = await conversationDb.createConversation( { conversationData , userId }  );


      return conversation;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async deleteConversation( id ) {

    try {

      const conversation = await conversationDb.deleteConversation( id );

  
      return conversation;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async updateConversation( {conversationId, updatedConversation} ) {

    try {

      const conversation = await conversationDb.updateConversation( {conversationId, updatedConversation} );
  
      return conversation;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}

module.exports = new ConversationService();
