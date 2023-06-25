import { SlashCommandBuilder } from 'discord.js'
import ConnectClient from 'discord-client'
import type { SNSEvent } from 'aws-lambda'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  handler: async (snsEvent: SNSEvent) => {
    const client = new ConnectClient()
    await client.connect()

    snsEvent.Records.forEach(async (event) => {
      const interaction = client.parserInteraction(JSON.parse(event.Sns.Message))

      try {
        if (!interaction.isChatInputCommand())
          return

        // Not working, must fix
        console.log('Replying with reply')
        await interaction.reply('Pong!')
      }
      catch (err) {
        console.error(err)
        await interaction.reply('There was an error executing the command')
      }
    })

    return []
  },
}
