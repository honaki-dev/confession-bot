import { ChatInputCommandInteraction, Interaction } from "discord.js";

export function confessionTable(interaction: Interaction) {
  const { guildId } = interaction;
  return `cfs:${guildId}`;
}
