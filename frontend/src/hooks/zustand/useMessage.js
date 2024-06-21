import { create } from "zustand";

const useMessage = create((set) => ({
  messages: [],
  
  setMessages: (messages) => set({ messages }),

  setNewMessage: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  deleteMessageFromState: (messageId) => {
    set((state) => ({
      messages: state.messages.filter(message => message.id !== messageId),
    }));
  },
}));

export default useMessage;
