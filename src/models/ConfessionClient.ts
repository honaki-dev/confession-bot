import { QuickDB } from "quick.db";
import path from "path";
import { SlashCommand } from "./SlashCommand";
import { Client, ClientOptions, Collection } from "discord.js";

import { loadBotEvents } from "../modules/loadBotEvents";
import { loadBotCommands } from "../modules/loadBotCommands";

interface ConfessionClientOptions extends ClientOptions {}

export class ConfessionClient extends Client {
  constructor(options: ConfessionClientOptions) {
    super(options);

    this.commands = new Collection<any, SlashCommand>();
    const sqliteFilePath = path.join(__dirname, "..", "..", "cfs.db");
    this.db = new QuickDB({ filePath: sqliteFilePath });

    this.init();
  }

  public commands: Collection<any, SlashCommand>;
  public db: QuickDB;

  private init() {
    loadBotEvents(this);
    loadBotCommands(this);
  }
}
