import BotEvent from "../models/BotEvent";

export default new BotEvent({
  name: "ready",
  run(client) {
    console.log(`Logged in as`, client.user.tag);
  }
});
