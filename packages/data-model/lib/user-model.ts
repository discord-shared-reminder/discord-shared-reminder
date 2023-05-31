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
  due_date: Date
  status: string
  created_at: Date
}

export interface Reminder {
  id: string
  reminder_date: Date
  last_sent_at: Date
  created_at: Date
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
}
