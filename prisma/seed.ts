import { db } from "@/lib/db"
import { ensureBaseData } from "@/lib/ensure-base-data"

async function seed() {
  await ensureBaseData()
  console.log("✅ EngelsizForum örnek verileri hazır")
}

seed()
  .catch((error) => {
    console.error("Seed error", error)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
