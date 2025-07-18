import "dotenv/config";
import { GatewayIntentBits } from "discord.js";
import { ConfessionClient } from "./models/ConfessionClient";

const client = new ConfessionClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.login();
