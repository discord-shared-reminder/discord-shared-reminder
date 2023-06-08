import type { ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  handler: async (interaction: ChatInputCommandInteraction) => {
    try {
      if (!interaction.isChatInputCommand())
        return

      await interaction.reply('Pong!')
    }
    catch (err) {
      console.error(err)
      await interaction.reply('There was an error executing the command')
    }
  },
}
