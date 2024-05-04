const messageDb = require("../db/message.db");
const { ErrorHandler } = require("../helpers/error.helper");
const { UUIDv4Generator } = require("../helpers/uuid.helper");



class MessageService {

  async getAllMessagesByConversationId( conversationId ) {

    try {
      const messages = await messageDb.getAllMessagesByConversationId(conversationId);

      return messages;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createMessage( {conversationId, messageContent, isFuture} ) {

    try {

      const messageId = UUIDv4Generator(); 

      const messageData = { messageId, messageContent, isFuture, conversationId };

      const message = await messageDb.createMessage( { messageData }  );


      return message;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

 

}

module.exports = new MessageService();
