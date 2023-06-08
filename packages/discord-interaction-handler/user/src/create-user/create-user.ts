import type { ChatInputCommandInteraction, ModalActionRowComponentBuilder } from 'discord.js'
import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a new user in the database'),

  handler: async (interaction: ChatInputCommandInteraction) => {
    const modal = new ModalBuilder()
      .setCustomId('user-create')
      .setTitle('Create a new user')

    const username = new TextInputBuilder()
      .setCustomId('name-input')
      .setLabel('Name')
      .setMinLength(3)
      .setMaxLength(20)
      .setRequired(true)
      .setStyle(TextInputStyle.Short)

    const email = new TextInputBuilder()
      .setCustomId('email-input')
      .setLabel('Email')
      .setRequired(true)
      .setStyle(TextInputStyle.Short)

    const discordUser = new TextInputBuilder()
      .setCustomId('discord-user-input')
      .setLabel('Discord Username')
      .setStyle(TextInputStyle.Short)

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(username)
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(email)
    const thirdActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(discordUser)

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow)

    try {
      if (!interaction.isChatInputCommand())
        return

      await interaction.showModal(modal)
      await interaction.awaitModalSubmit({ time: 60_000 })

      interaction.editReply('User submitted successfully')
    }
    catch (err) {
      interaction.editReply('There was an error submitting the user')
    }
  },
}
