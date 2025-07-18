import path from "path";
import { readdirSync } from "fs";
import BotEvent from "../models/BotEvent";
import { ConfessionClient } from "../models/ConfessionClient";

export async function loadBotEvents(client: ConfessionClient) {
  const dir = path.join(__dirname, "..", "events");
  const events = readdirSync(dir);
  for (const event of events) {
    const file = path.join(dir, event);
    const ext = path.extname(file);
    if (!/\.(ts|js)$/.test(ext)) return;
    const { name, run } = (await import(file)).default as BotEvent;
    client.on(name, run);
  }
}
