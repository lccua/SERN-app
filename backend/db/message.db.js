const prisma = require("./client/prismaClient");
const { ErrorHandler } = require("../helpers/error.helper");


class MessageDb {
  async getAllMessagesByConversationId(conversationId) {
    try {
      const messages = await prisma.message.findMany({
        where: { conversation_id: conversationId },
      });
      return messages;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createMessage( { messageData }  ) {
    try {
      const { messageId, messageContent, conversationId } = messageData;

      const conversation = await prisma.conversation.create({
        data: {
          id: messageId,
          content: messageContent,
          sent_at: new Date(),
          is_future: null, // moet true or false worden
          conversation: { connect: { id: conversationId } } // Connect the message to the conversation
        }
      });
      return conversation;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }



}

module.exports = new MessageDb();
