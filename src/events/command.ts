import { ConfessionClient } from "../models/ConfessionClient";
import BotEvent from "../models/BotEvent";

export default new BotEvent({
  name: "interactionCreate",
  run(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const bot = interaction.client as ConfessionClient;
    const cmdName = interaction.commandName;
    const cmd = bot.commands.get(cmdName);
    if (!cmd) return;
    try {
      cmd.run(interaction);
    } catch (err) {
      console.error(err);
      interaction.reply(`We have some error while execute this command.`);
    }
  }
});
