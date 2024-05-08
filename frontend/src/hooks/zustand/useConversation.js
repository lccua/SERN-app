import { create } from "zustand";

const useConversation = create((set) => ({

  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  conversations: [],
  setConversations: (conversations) => set({ conversations }),

  setNewConversation: (newConversation) => {
    set((state) => ({
      conversations: [...state.conversations, newConversation],
    }));
  },

}));

export default useConversation;
