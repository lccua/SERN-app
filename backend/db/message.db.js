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

}

module.exports = new MessageDb();
