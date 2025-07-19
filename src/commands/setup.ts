import { checkPerms } from "../modules/checks/guild";
import { SlashCommand } from "../models/SlashCommand";
import { PermissionFlagsBits } from "discord.js";

export default new SlashCommand({
  data: {
    name: "setup",
    description: "Set up the Confessions channel for this server."
  },
  checks: [checkPerms(PermissionFlagsBits.ManageGuild)],
  run(interaction) {
    interaction.reply("Hello world!");
  }
});
