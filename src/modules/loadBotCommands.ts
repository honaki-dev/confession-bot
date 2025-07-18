import path from "path";
import { readdirSync } from "fs";
import { ConfessionClient } from "../models/ConfessionClient";
import { SlashCommand } from "../models/SlashCommand";

export async function loadBotCommands(client: ConfessionClient) {
  const dir = path.join(__dirname, "..", "commands");
  const cmds = readdirSync(dir);
  for (const cmd of cmds) {
    const file = path.join(dir, cmd);
    const ext = path.extname(file);
    if (!/\.(ts|js)$/.test(ext)) return;
    const command = (await import(file)).default as SlashCommand;
    client.commands.set(command.data.name, command);
  }
}
