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
  ack: Ack[]
}
