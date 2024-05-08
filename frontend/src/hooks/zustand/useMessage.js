import { create } from "zustand";

const useMessage = create((set) => ({

	messages: [],
	setMessages: (messages) => set({ messages }),

  setNewMessage: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  
}));

export default useMessage;