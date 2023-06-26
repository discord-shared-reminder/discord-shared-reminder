import { SlashCommandBuilder } from 'discord.js'
import ConnectClient from 'discord-client'
import type { SNSEvent } from 'aws-lambda'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  handler: async (snsEvent: SNSEvent) => {
    const failedToProcess = []
    const client = new ConnectClient()
    await client.connect()

    for await (const event of snsEvent.Records) {
      const interaction = await client.parserInteraction(JSON.parse(event.Sns.Message))
      console.debug(interaction)

      try {
        if (!interaction.isChatInputCommand())
          return

        console.debug('Replying')
        await interaction.editReply({ content: 'Pong!' })
      }
      catch (err) {
        console.error(err)
        failedToProcess.push(event.Sns.MessageId)
      }
    }

    return failedToProcess
  },
}
