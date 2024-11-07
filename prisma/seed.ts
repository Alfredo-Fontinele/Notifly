import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

async function main() {
  const notification = {
    recipientId: randomUUID(),
    content: 'Your order has been shipped!',
    category: 'order',
    readAt: null,
    canceledAt: null,
    createdAt: new Date(),
  }

  await Promise.all(
    Array.from({ length: 100_000 }).map(async (_, index) => {
      await prisma.notification.create({
        data: {
          ...notification,
          content: `${index}° | ${notification.content}`,
        },
      })
    }),
  )
}

main()
  .then(() => {
    console.log('Seeding completed')
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
