const messageDb = require("../db/message.db");
const { ErrorHandler } = require("../helpers/error.helper");


class MessageService {

  async getAllMessagesByConversationId( conversationId ) {

    try {
      const messages = await messageDb.getAllMessagesByConversationId(conversationId);

      return messages;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

 

}

module.exports = new MessageService();
