import { createContext } from "react";

export const MessagesContext = createContext({
  messages: [], // Default to an empty array
  setMessages: () => {}, // Default function to avoid errors
});
