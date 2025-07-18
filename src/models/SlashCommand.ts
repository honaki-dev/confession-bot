import {
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody
} from "discord.js";

interface SlashCommandOptions {
  data: RESTPostAPIApplicationCommandsJSONBody;
  run: (interaction: ChatInputCommandInteraction) => Promise<any> | any;
}

export class SlashCommand {
  constructor(options: SlashCommandOptions) {
    this.data = options.data;
    this.run = options.run;
  }

  public readonly data;
  public readonly run;
}
