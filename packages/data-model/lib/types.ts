interface UserData {
  id: string
  username: string
  discordId: string
  createdAt: Date
  ack: Ack[]
  reminders: Reminder[]
}

interface Ack {
  id: string
  amount: number
  due_date: Date
  status: string
  created_at: Date
}

interface Reminder {
  id: string
  reminder_date: Date
  last_sent_at: Date
  created_at: Date
}

export default UserData
