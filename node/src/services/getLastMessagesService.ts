import prismaClient from "../prisma";

class getLastMessagesService {
  async execute() {
    const message = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      include: { user: true },
    });

    return message;
  }
}

export { getLastMessagesService };
