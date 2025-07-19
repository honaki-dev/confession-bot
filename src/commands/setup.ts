import { checkPerms } from "../modules/checks/guild";
import { SlashCommand } from "../models/SlashCommand";
import { ConfessionClient } from "../models/ConfessionClient";
import { confessionTable } from "../modules/getTableName";
import { ChannelType, MessageFlags, PermissionFlagsBits } from "discord.js";

export default new SlashCommand({
  data: {
    name: "setup",
    description: "Set up the Confessions channel for this server."
  },
  checks: [checkPerms(PermissionFlagsBits.ManageGuild)],
  async run(interaction) {
    const bot = interaction.client as ConfessionClient;
    const table = confessionTable(interaction);

    const check = await bot.db.get(table);
    if (check) {
      return interaction.reply({
        content: "This server already has a confessions channel.",
        flags: [MessageFlags.Ephemeral]
      });
    }

    let channel;
    try {
      channel = await interaction.guild?.channels.create({
        name: "confessions",
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone.id,
            deny: ["SendMessages"]
          },
          {
            id: interaction.client.user.id,
            allow: ["ViewChannel", "SendMessages"]
          }
        ]
      });
    } catch (err) {
      console.error("Channel creation error:", err);
      return interaction.reply({
        content:
          "Failed to create the confessions channel. Please check my permissions.",
        flags: [MessageFlags.Ephemeral]
      });
    }

    if (!channel) return;

    const rawData = {
      cfsChannelId: channel.id,
      approvalChannelId: ""
    };

    await bot.db.set(table, rawData);

    return interaction.reply({
      content: `Confessions channel has been created: ${channel.toString()}`,
      flags: [MessageFlags.Ephemeral]
    });
  }
});
