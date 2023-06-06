import { Client, Events, GatewayIntentBits } from 'discord.js'
import { CLIENT_ID } from './util/constants'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.login(CLIENT_ID)