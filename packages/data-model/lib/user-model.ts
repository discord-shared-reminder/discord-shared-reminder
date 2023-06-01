import { randomUUID } from 'node:crypto'
import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

export interface UserData {
  id: string
  username: string
  discordId: string
  guildId: string
  createdAt: Date
  ack: Ack[]
  reminders: Reminder[]
}

export interface Ack {
  id: string
  amount: number
  dueDate: Date
  status: string
  createdAt: Date
}

export interface Reminder {
  id: string
  reminderDate: Date
  lastSentAt: Date
  createdAt: Date
}

export class User implements UserData {
  id: string
  username: string
  discordId: string
  guildId: string
  createdAt: Date
  ack: Ack[]
  reminders: Reminder[]

  constructor(userData: UserData) {
    this.id = userData.id
    this.username = userData.username
    this.discordId = userData.discordId
    this.guildId = userData.guildId
    this.createdAt = userData.createdAt
    this.ack = userData.ack
    this.reminders = userData.reminders
  }

  listUsers = async () => {
    const params = {
      TableName: process.env.TABLE_NAME,
    }

    try {
      const dynamo = new DynamoDBClient({})
      const { Items } = await dynamo.send(new ScanCommand(params))

      if (!Items)
        return new Error('No users found')

      return Items.map(item => unmarshall(item))
    }
    catch (err) {
      console.error(err)
      return { error: err }
    }
  }

  getUser = async (id: string) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: marshall({ id }),
    }

    try {
      const dynamo = new DynamoDBClient({})
      const { Item } = await dynamo.send(new GetItemCommand(params))

      if (!Item)
        return new Error('No user found')

      return unmarshall(Item)
    }
    catch (err) {
      console.error(err)
      return { error: err }
    }
  }

  createUser = async (user: Partial<UserData>) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: marshall({
        id: randomUUID(),
        createdAt: new Date(),
        ...user,
      }),
    }

    try {
      const dynamo = new DynamoDBClient({})

      return await dynamo.send(new PutItemCommand(params))
    }
    catch (err) {
      console.error(err)
      return { error: err }
    }
  }

  // TODO: add deleteUser | getUsersBy | updateUser
}
