import {
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody
} from "discord.js";

type checkResult = {
  isOk: boolean;
  message: string;
};
export type checkFunc = (
  interaction: ChatInputCommandInteraction
) => checkResult;

interface SlashCommandOptions {
  data: RESTPostAPIApplicationCommandsJSONBody;
  checks?: checkFunc[];
  run: (interaction: ChatInputCommandInteraction) => Promise<any> | any;
}

export class SlashCommand {
  constructor(options: SlashCommandOptions) {
    this.data = options.data;
    this.checks = options.checks ?? [];
    this.run = options.run;
  }

  public readonly checks;
  public readonly data;
  public readonly run;
}
