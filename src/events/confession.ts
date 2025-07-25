import { ConfessionClient } from "../models/ConfessionClient";
import BotEvent from "../models/BotEvent";
import { confessionTable } from "../modules/getTableName";
import { ConfessionSetting } from "../interfaces/ConfessionSetting";
import { EmbedBuilder, MessageFlags } from "discord.js";

export default new BotEvent({
  name: "interactionCreate",
  async run(interaction) {
    const bot = interaction.client as ConfessionClient;

    // send modal
    if (interaction.isModalSubmit()) {
      if (interaction.customId !== "send:confession") return;
      const data = await bot.db.get<ConfessionSetting>(
        confessionTable(interaction)
      );
      if (data) {
        const cfsChannel = interaction.guild?.channels.cache.get(
          data.confession_channel_id
        );
        if (!cfsChannel) {
          interaction.reply({
            content: "This server not has a confessions channel.",
            flags: [MessageFlags.Ephemeral]
          });
        }
        if (cfsChannel?.isSendable()) {
          const cfsContent = interaction.fields.getTextInputValue(
            `send:confession:content`
          );
          const embed = new EmbedBuilder({ description: cfsContent });
          cfsChannel.send({
            embeds: [embed]
          });
          interaction.reply({
            content: "Confession have been sent.",
            flags: [MessageFlags.Ephemeral]
          });
        } else {
          interaction.reply({
            content: "I can't send this message, please check my permission.",
            flags: [MessageFlags.Ephemeral]
          });
        }
      } else {
        interaction.reply({
          content: "This server not has a confessions channel.",
          flags: [MessageFlags.Ephemeral]
        });
      }
    }
  }
});
