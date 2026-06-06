const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const pos = await prisma.purchaseOrder.findMany({ orderBy: { createdAt: 'desc' } });
  console.log("ALL POs:", JSON.stringify(pos, null, 2));
}
check().catch(console.error).finally(() => prisma.$disconnect());
