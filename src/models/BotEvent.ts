import { ClientEvents } from "discord.js";

interface EventOptions<Event extends keyof ClientEvents> {
  name: Event;
  run: (...args: ClientEvents[Event]) => Promise<any> | any;
}

export default class BotEvent<
  Event extends keyof ClientEvents = keyof ClientEvents
> {
  public readonly name: Event;
  public readonly run: (...args: ClientEvents[Event]) => Promise<any> | any;

  constructor(options: EventOptions<Event>) {
    this.name = options.name;
    this.run = options.run;
  }
}
