import { ChatInputCommandInteraction } from "discord.js";

export function confessionTable(interaction: ChatInputCommandInteraction) {
  const { guildId } = interaction;
  return `cfs:${guildId}`;
}
