import { ChatInputCommandInteraction } from 'discord.js'

export class Interaction extends ChatInputCommandInteraction {
  constructor(client: any, data: any) {
    super(client, data)
  }
}
