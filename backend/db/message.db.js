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

  async createMessage({ messageData }) {
    try {
      const { messageId, messageContent, isFuture, conversationId } = messageData;
      const message = await prisma.message.create({
        data: {
          id: messageId,
          content: messageContent,
          sent_at: new Date(),
          is_future: isFuture,
          conversation: { connect: { id: conversationId } }
        }
      });
      return message;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async deleteMessage(messageId) {
    try {
      const deletedMessage = await prisma.message.delete({
        where: { id: messageId },
      });
      return deletedMessage;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}

module.exports = new MessageDb();
