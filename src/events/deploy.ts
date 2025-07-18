import { ConfessionClient } from "../models/ConfessionClient";
import BotEvent from "../models/BotEvent";

export default new BotEvent({
  name: "ready",
  run(client) {
    const bot = client as ConfessionClient;
    const cmds = bot.commands.map((v) => v.data);
    try {
      bot.application?.commands.set(cmds);
      console.log(`Deployed ${cmds.length} global slash commands.`);
    } catch (err) {
      throw err;
    }
  }
});
