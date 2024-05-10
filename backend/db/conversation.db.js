const prisma = require("./client/prismaClient");
const { ErrorHandler } = require("../helpers/error.helper");


class ConversationDb {
  async getAllConversations(userId) {
    try {
      const conversations = await prisma.conversation.findMany({
        where: { user_id: userId },
      });
      return conversations;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getConversation(conversationId) {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });
      return conversation;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createConversation({ conversationData }) {
    try {
      const { conversationId, conversationName, userId } = conversationData;
      const conversation = await prisma.conversation.create({
        data: {
          id: conversationId,
          name: conversationName,
          created_at: new Date(),
          user: { connect: { id: userId } } 
        }
      });
      return conversation;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async deleteConversation( conversationId ) {
    try {
      const conversation = await prisma.conversation.delete({
        where: { id: conversationId }
      });
      return conversation;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async updateConversation({ conversationId, updatedConversation }) {
    try {
      const conversation = await prisma.conversation.update({
        where: { id: conversationId },
        data: updatedConversation
      });
      return conversation;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}

module.exports = new ConversationDb();
