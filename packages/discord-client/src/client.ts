import { Client, GatewayIntentBits } from 'discord.js'
import { Interaction } from './interaction'
import { DISCORD_TOKEN } from './util/constants'

export default class ClientSingleton {
  private static instance: ClientSingleton
  client: Client

  private constructor() {}

  public static async getInstance(): Promise<ClientSingleton> {
    if (!ClientSingleton.instance) {
      const instance = new ClientSingleton()

      instance.client = new Client({
        intents: [
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.GuildMessageTyping,
          GatewayIntentBits.MessageContent,
        ],
      })
      await instance.connect()

      return instance
    }

    return ClientSingleton.instance
  }

  async connect() {
    console.log('Connecting client')
    return new Promise((resolve, reject) => {
      // Debugging levels
      this.client.on('warn', console.warn)
      this.client.on('debug', console.debug)

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

  async parserInteraction(data: any): Promise<Interaction> {
    const interaction = new Interaction(this.client, data)

    // So we can edit reply, the interaction doesn't have the context to know it was already deferred
    interaction.deferred = true
    interaction.replied = true

    return interaction
  }
}
