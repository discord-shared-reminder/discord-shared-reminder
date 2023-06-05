import { randomUUID } from 'node:crypto'
import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

export interface UserData {
  guildId: string
  uuid: string
  username: string
  email: string
  discordId?: string
  createdAt: Date
  deletedAt?: Date
}

export class User implements UserData {
  guildId: string
  uuid: string
  username: string
  email: string
  discordId?: string
  createdAt: Date
  deletedAt?: Date

  constructor(userData: UserData) {
    this.guildId = userData.guildId
    this.uuid = userData.uuid
    this.username = userData.username
    this.email = userData.email
    this.discordId = userData.discordId
    this.createdAt = userData.createdAt
    this.deletedAt = userData.deletedAt
  }

  listUsers = async (guildId: string) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: '#guildId = :guildId',
      ExpressionAttributeValues: marshall({
        ':guildId': guildId,
      }),
      ProjectionExpression: 'uuid, username, email, discordId, createdAt, deletedAt',
    }

    try {
      const dynamo = new DynamoDBClient({})
      const { Items } = await dynamo.send(new QueryCommand(params))

      if (!Items)
        return new Error('No users found')

      return Items.map(item => unmarshall(item))
    }
    catch (err) {
      console.error(err)
      return { error: err }
    }
  }

  getUser = async (uuid: string) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: marshall({ uuid }),
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

  createUser = async (user: UserData) => {
    user.uuid = randomUUID()
    user.createdAt = new Date()
    user.deletedAt = undefined

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: marshall(user),
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

  updateUser = async (uuid: string, user: UserData) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: marshall({ uuid }),
      UpdateExpression: 'SET #username = :username, #discordId = :discordId, #email = :email',
      ExpressionAttributeValues: marshall({
        ':username': user.username,
        ':discordId': user.discordId,
        ':email': user.email,
      }),
      ReturnValues: 'ALL_NEW',
    }

    try {
      const dynamo = new DynamoDBClient({})

      return await dynamo.send(new UpdateItemCommand(params))
    }
    catch (err) {
      console.error(err)
      return { error: err }
    }
  }

  deleteUser = async (uuid: string) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: marshall({ uuid }),
      UpdateExpression: 'SET #deletedAt = :deletedAt',
      ExpressionAttributeValues: marshall({
        ':deletedAt': new Date(),
      }),
      ReturnValues: 'ALL_NEW',
    }

    try {
      const dynamo = new DynamoDBClient({})

      return await dynamo.send(new UpdateItemCommand(params))
    }
    catch (err) {
      console.error(err)
      return { error: err }
    }
  }
}
