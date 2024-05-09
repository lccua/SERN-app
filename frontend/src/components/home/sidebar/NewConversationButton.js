import React, { useState } from 'react';
import Popup from './Popup.js'; // Replace './Popup.js' with the actual path to your Popup component
import { useCreateConversation } from '../../../hooks/conversation/useCreateConversastion.js';

const NewConversationButton = () => {
  // state
  const [buttonPopup, setButtonPopup] = useState(false);
  const [conversationName, setConversationName] = useState('');

  // custom hooks
  const { createConversation } = useCreateConversation();

  const handleCreateConversation = async () => {

    await createConversation(conversationName)

    // Close the popup
    setButtonPopup(false);

    // Reset conversationName
    setConversationName('');
  };

  return (
    <>
      <button onClick={() => setButtonPopup(true)}>Create a conversation</button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>Create a conversation</h3>
        <p>Please name your conversation:</p>
        <input 
          type="text" 
          value={conversationName} 
          onChange={(e) => setConversationName(e.target.value)} 
          placeholder="E.g. Relationships, Goals" 
        />
        <button onClick={handleCreateConversation}>Create conversation</button>
      </Popup>
    </>
  );
};

export default NewConversationButton;
