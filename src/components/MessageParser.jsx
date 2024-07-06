// MessageParser.js

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes("sign in")) {
      this.actionProvider.signIn();
    } else if (lowerCaseMessage.includes("sign out") || lowerCaseMessage.includes("logout")) {
      this.actionProvider.signOut();
    } else if (lowerCaseMessage.includes("search")) {
      this.actionProvider.search();
    } else if (lowerCaseMessage.includes("cart")) {
      this.actionProvider.viewCart();
    } else if (lowerCaseMessage.includes("order")) {
      this.actionProvider.viewOrders();
    } else if (lowerCaseMessage.includes("product")) {
      this.actionProvider.viewProduct();
    } else if (lowerCaseMessage.includes("help")) {
      this.actionProvider.help();
    } else {
      this.actionProvider.defaultResponse();
    }
  }
}

export default MessageParser;
