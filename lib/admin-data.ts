import { prisma } from "./prisma";

export async function getAllPostsAdmin() {
  return prisma.post.findMany({ orderBy: { date: "desc" } });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export type PostInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string;
  content: string;
  published: boolean;
};

export async function createPost(input: PostInput) {
  return prisma.post.create({
    data: { ...input, date: new Date(input.date) },
  });
}

export async function updatePost(id: string, input: PostInput) {
  return prisma.post.update({
    where: { id },
    data: { ...input, date: new Date(input.date) },
  });
}

export async function deletePost(id: string) {
  return prisma.post.delete({ where: { id } });
}

export async function getAllLeads() {
  return prisma.leadSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAnalyticsSummary() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [views7d, views30d, totalLeads, leads7d, topPagesRaw, recentLeads] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.pageView.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.leadSubmission.count(),
    prisma.leadSubmission.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      where: { createdAt: { gte: thirtyDaysAgo } },
      orderBy: { _count: { path: "desc" } },
      take: 8,
    }),
    prisma.leadSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const topPages = topPagesRaw.map((row) => ({ path: row.path, count: row._count.path }));

  return { views7d, views30d, totalLeads, leads7d, topPages, recentLeads };
}

export async function getVisitorSessions() {
  const sessions = await prisma.visitorSession.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return sessions.map((session) => ({
    ...session,
    sectionsViewed: JSON.parse(session.sectionsViewed) as string[],
  }));
}
