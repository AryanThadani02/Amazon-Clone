// ActionProvider.js

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  greet() {
    const message = this.createChatBotMessage("Hello! How can I assist you today?");
    this.updateChatbotState(message);
  }

  signIn() {
    const message = this.createChatBotMessage("Please sign in to continue.");
    this.updateChatbotState(message);
    // Redirect to sign-in page or handle sign-in logic
  }

  signOut() {
    const message = this.createChatBotMessage("You have been logged out.");
    this.updateChatbotState(message);
    // Handle sign-out logic, clear user session, etc.
  }

  search() {
    const message = this.createChatBotMessage("Please enter what you would like to search for.");
    this.updateChatbotState(message);
    // Implement search functionality or redirect to search page
  }

  viewCart() {
    const message = this.createChatBotMessage("Viewing your shopping cart.");
    this.updateChatbotState(message);
    // Redirect to the shopping cart page or display cart details
  }

  viewOrders() {
    const message = this.createChatBotMessage("Viewing your orders.");
    this.updateChatbotState(message);
    // Redirect to the orders page or display order history
  }

  viewProduct() {
    const message = this.createChatBotMessage("Viewing product details.");
    this.updateChatbotState(message);
    // Implement logic to view specific product details
  }

  help() {
    const message = this.createChatBotMessage(
      "Here are some commands you can use:\n" +
        "- 'Sign In': To log into your account.\n" +
        "- 'Sign Out' or 'Logout': To log out of your account.\n" +
        "- 'Search': To search for products.\n" +
        "- 'Cart': To view your shopping cart.\n" +
        "- 'Order': To view your orders.\n" +
        "- 'Product': To view product details.\n" +
        "- 'Help': To see this list again."
    );
    this.updateChatbotState(message);
  }

  defaultResponse() {
    const message = this.createChatBotMessage("I'm sorry, I didn't understand that.");
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
