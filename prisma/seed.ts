import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BLOG_DIR = path.join(process.cwd(), "content/blog");

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);

    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        tags: (data.tags ?? []).join(","),
        content,
        published: true,
      },
    });
    console.log(`Seeded: ${slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
