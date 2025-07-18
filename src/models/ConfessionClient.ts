import { SlashCommand } from "./SlashCommand";
import { Client, ClientOptions, Collection } from "discord.js";

import { loadBotEvents } from "../modules/loadBotEvents";
import { loadBotCommands } from "../modules/loadBotCommands";

interface ConfessionClientOptions extends ClientOptions {}

export class ConfessionClient extends Client {
  constructor(options: ConfessionClientOptions) {
    super(options);

    this.commands = new Collection<any, SlashCommand>();

    this.init();
  }

  public commands: Collection<any, SlashCommand>;

  private init() {
    loadBotEvents(this);
    loadBotCommands(this);
  }
}
