import { db } from "@/lib/db"
import { baseAccessibilityResources, baseCategories, basePosts, baseThreads, baseUsers } from "@/lib/forum-data"

export async function ensureBaseData() {
  const [categoryCount, userCount, threadCount, postCount, resourceCount] = await Promise.all([
    db.category.count(),
    db.user.count(),
    db.thread.count(),
    db.post.count(),
    db.accessibilityResource.count(),
  ])

  if (categoryCount === 0) {
    await db.category.createMany({
      data: baseCategories.map((category) => ({
        ...category,
        description: category.description,
      })),
    })
  }

  if (userCount === 0) {
    await db.user.createMany({
      data: baseUsers.map((user) => ({
        ...user,
      })),
    })
  }

  if (threadCount === 0) {
    const [categories, users] = await Promise.all([
      db.category.findMany({ select: { id: true, slug: true } }),
      db.user.findMany({ select: { id: true, email: true } }),
    ])

    const categoryMap = new Map(categories.map((category) => [category.slug, category.id]))
    const userMap = new Map(users.map((user) => [user.email, user.id]))

    for (const thread of baseThreads) {
      const categoryId = categoryMap.get(thread.categorySlug)
      const authorId = userMap.get(thread.authorEmail)
      if (!categoryId || !authorId) continue

      await db.thread.create({
        data: {
          title: thread.title,
          slug: thread.slug,
          content: thread.content,
          categoryId,
          authorId,
          isSticky: thread.isSticky ?? false,
          isLocked: thread.isLocked ?? false,
          viewCount: thread.viewCount ?? 0,
        },
      })
    }
  }

  if (postCount === 0) {
    const [threads, users] = await Promise.all([
      db.thread.findMany({ select: { id: true, slug: true } }),
      db.user.findMany({ select: { id: true, email: true } }),
    ])

    const threadMap = new Map(threads.map((thread) => [thread.slug, thread.id]))
    const userMap = new Map(users.map((user) => [user.email, user.id]))
    const postReference = new Map<string, string>()

    for (const post of basePosts) {
      const threadId = threadMap.get(post.threadSlug)
      const authorId = userMap.get(post.authorEmail)
      if (!threadId || !authorId) continue

      const parentId =
        post.parentPosition !== undefined
          ? postReference.get(`${post.threadSlug}-${post.parentPosition}`)
          : null

      const created = await db.post.create({
        data: {
          content: post.content,
          authorId,
          threadId,
          parentId: parentId ?? undefined,
          position: post.position,
        },
      })

      postReference.set(`${post.threadSlug}-${post.position}`, created.id)
    }
  }

  if (resourceCount === 0) {
    await db.accessibilityResource.createMany({
      data: baseAccessibilityResources.map((resource) => ({
        ...resource,
        tags: resource.tags,
      })),
    })
  }
}
