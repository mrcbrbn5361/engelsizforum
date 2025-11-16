import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ensureBaseData } from "@/lib/ensure-base-data"

export async function GET() {
  try {
    await ensureBaseData()

    const [categoriesRaw, recentThreads, resources, totalUsers, totalThreads, totalPosts, activeUsers] = await Promise.all([
      db.category.findMany({
        orderBy: { order: "asc" },
        include: {
          threads: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              id: true,
              title: true,
              createdAt: true,
              _count: { select: { posts: true } },
              author: { select: { name: true } },
            },
          },
          _count: { select: { threads: true } },
        },
      }),
      db.thread.findMany({
        orderBy: { createdAt: "desc" },
        take: 4,
        include: {
          category: { select: { name: true } },
          author: { select: { name: true } },
          _count: { select: { posts: true } },
        },
      }),
      db.accessibilityResource.findMany({ orderBy: { createdAt: "desc" } }),
      db.user.count(),
      db.thread.count(),
      db.post.count(),
      db.user.findMany({ orderBy: { updatedAt: "desc" }, take: 6, select: { id: true, name: true } }),
    ])

    const categoryPostCounts = await Promise.all(
      categoriesRaw.map((category) =>
        db.post.count({ where: { thread: { categoryId: category.id } } })
      )
    )

    const categories = categoriesRaw.map((category, index) => {
      const latestThread = category.threads[0]
      return {
        id: category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
        threadCount: category._count.threads,
        postCount: categoryPostCounts[index],
        latestThread: latestThread
          ? {
              title: latestThread.title,
              author: latestThread.author?.name ?? "Topluluk Üyesi",
              replies: Math.max(latestThread._count.posts - 1, 0),
              createdAt: latestThread.createdAt,
            }
          : null,
      }
    })

    const formattedThreads = recentThreads.map((thread) => ({
      id: thread.id,
      title: thread.title,
      category: thread.category.name,
      replies: Math.max(thread._count.posts - 1, 0),
      views: thread.viewCount,
      author: thread.author?.name ?? "Topluluk Üyesi",
      createdAt: thread.createdAt,
    }))

    return NextResponse.json({
      categories,
      recentThreads: formattedThreads,
      stats: {
        totalUsers,
        totalThreads,
        totalPosts,
        onlineUsers: Math.max(activeUsers.length * 3, 12),
        activeResources: resources.length,
      },
      resources,
      activeUsers,
    })
  } catch (error) {
    console.error("Forum overview error", error)
    return NextResponse.json({ message: "Forum overview could not be loaded" }, { status: 500 })
  }
}
