import { SlashCommand } from "../models/SlashCommand";
import { ConfessionClient } from "../models/ConfessionClient";
import { confessionTable } from "../modules/getTableName";
import { ConfessionSetting } from "../interfaces/ConfessionSetting";
import {
  ActionRowBuilder,
  MessageFlags,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";

export default new SlashCommand({
  data: {
    name: "send",
    description: "Send a confession."
  },
  async run(interaction) {
    const bot = interaction.client as ConfessionClient;
    const table = confessionTable(interaction);
    const check = await bot.db.get<ConfessionSetting>(table);
    if (!check) {
      return interaction.reply({
        content: "This server not has a confessions channel.",
        flags: [MessageFlags.Ephemeral]
      });
    }

    const { confession_channel_id } = check;
    const cfsChannel = interaction.guild?.channels.cache.get(
      confession_channel_id
    );
    if (!cfsChannel) {
      return interaction.reply(
        [
          "I can't see confessions channel.",
          "Try `/configure` to edit confessions channel if you deleted it."
        ].join("\n")
      );
    }

    const modal = new ModalBuilder()
      .setTitle("Send a confession")
      .setCustomId("send:confession");

    const content = new TextInputBuilder()
      .setLabel("Content:")
      .setCustomId("send:confession:content")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(content);

    modal.addComponents(row);

    interaction.showModal(modal);
  }
});
