import { db } from "@/lib/db"
import {
  baseAccessibilityResources,
  baseCategories,
  basePosts,
  baseThreads,
  baseUsers,
} from "@/lib/forum-data"

async function seedBaseData() {
  await db.$transaction(async (tx) => {
    const [categoryCount, userCount, threadCount, postCount, resourceCount] = await Promise.all([
      tx.category.count(),
      tx.user.count(),
      tx.thread.count(),
      tx.post.count(),
      tx.accessibilityResource.count(),
    ])

    if (categoryCount === 0) {
      await tx.category.createMany({
        data: baseCategories.map((category) => ({
          ...category,
          description: category.description,
        })),
        skipDuplicates: true,
      })
    }

    if (userCount === 0) {
      await tx.user.createMany({
        data: baseUsers.map((user) => ({
          ...user,
        })),
        skipDuplicates: true,
      })
    }

    if (threadCount === 0) {
      const [categories, users] = await Promise.all([
        tx.category.findMany({ select: { id: true, slug: true } }),
        tx.user.findMany({ select: { id: true, email: true } }),
      ])

      const categoryMap = new Map(categories.map((category) => [category.slug, category.id]))
      const userMap = new Map(users.map((user) => [user.email, user.id]))

      const threadData = baseThreads
        .map((thread) => {
          const categoryId = categoryMap.get(thread.categorySlug)
          const authorId = userMap.get(thread.authorEmail)
          if (!categoryId || !authorId) return null

          return {
            title: thread.title,
            slug: thread.slug,
            content: thread.content,
            categoryId,
            authorId,
            isSticky: thread.isSticky ?? false,
            isLocked: thread.isLocked ?? false,
            viewCount: thread.viewCount ?? 0,
          }
        })
        .filter((thread): thread is NonNullable<typeof thread> => Boolean(thread))

      if (threadData.length > 0) {
        await tx.thread.createMany({ data: threadData, skipDuplicates: true })
      }
    }

    if (postCount === 0) {
      const [threads, users] = await Promise.all([
        tx.thread.findMany({ select: { id: true, slug: true } }),
        tx.user.findMany({ select: { id: true, email: true } }),
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

        const created = await tx.post.create({
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
      await tx.accessibilityResource.createMany({
        data: baseAccessibilityResources.map((resource) => ({
          ...resource,
          tags: resource.tags,
        })),
        skipDuplicates: true,
      })
    }
  })
}

declare global {
  // eslint-disable-next-line no-var
  var __baseDataSeedPromise: Promise<void> | null | undefined
}

export async function ensureBaseData() {
  if (!globalThis.__baseDataSeedPromise) {
    globalThis.__baseDataSeedPromise = seedBaseData().catch((error) => {
      globalThis.__baseDataSeedPromise = null
      throw error
    })
  }

  return globalThis.__baseDataSeedPromise
}
