import { SlashCommand } from "../models/SlashCommand";

export default new SlashCommand({
  data: {
    name: "ping",
    description: "Return bot ping."
  },
  run(interaction) {
    interaction.reply("Hello world!");
  }
});
