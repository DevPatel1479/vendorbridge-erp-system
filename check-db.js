const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkQuotations() {
  const quotes = await prisma.quotation.findMany();
  console.log("Quotations in DB:", quotes);
  const rfqs = await prisma.rfq.findMany();
  console.log("RFQs in DB:", rfqs);
}

checkQuotations().catch(console.error).finally(() => prisma.$disconnect());
