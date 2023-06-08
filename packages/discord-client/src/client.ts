import { Client, GatewayIntentBits } from 'discord.js'
import { DISCORD_SECRET } from './util/constants'

export default class ConnectClient {
  client: Client

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
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
      if (!DISCORD_SECRET)
        reject(new Error('No Discord secret found'))

      this.client.login(DISCORD_SECRET)
    },
    )
  }
}
