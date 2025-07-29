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
      if (interaction.customId === "send:confession") {
        const data = await bot.db.get<ConfessionSetting>(
          confessionTable(interaction)
        );

        if (!data) {
          return interaction.reply({
            content: "This server not has a confessions channel.",
            flags: [MessageFlags.Ephemeral]
          });
        }

        const { confession_channel_id } = data;
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

        const content = interaction.fields.getTextInputValue("confession");
        const embed = new EmbedBuilder()
          .setTitle("Confession")
          .setDescription(content);
        if (!cfsChannel.isSendable()) {
          return interaction.reply("Confessions channel is not sendable.");
        }
        await cfsChannel.send({ embeds: [embed] });
        return interaction.reply("Sent confession.");
      }
    }
  }
});
