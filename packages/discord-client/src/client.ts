import { Client, GatewayIntentBits } from 'discord.js'
import { Interaction } from './interaction'
import { DISCORD_TOKEN } from './util/constants'

export default class ConnectClient {
  client: Client

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
      ],
    })
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        resolve(this)
      })
      this.client.on('error', (error) => {
        console.error(error)
        reject(error)
      })
      if (!DISCORD_TOKEN)
        reject(new Error('No Discord secret found'))

      this.client.login(DISCORD_TOKEN)
    },
    )
  }

  parserInteraction(data: any): Interaction {
    return new Interaction(this.client, data)
  }
}
