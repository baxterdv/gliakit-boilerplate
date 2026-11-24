/** Seed the local database with the same demo data the UI ships with. */
import { PrismaClient, Plan, CustomerStatus } from "@prisma/client";

const prisma = new PrismaClient();

const CUSTOMERS = [
  {
    slug: "aurora-labs",
    name: "Sarah Chen",
    email: "sarah@aurora.io",
    company: "Aurora Labs",
    plan: Plan.SHIP,
    status: CustomerStatus.ACTIVE,
    mrr: 199,
    seats: 12,
    events: ["Upgraded to Ship plan", "Invited 3 team members", "Started trial"],
  },
  {
    slug: "northwind",
    name: "Marcus Webb",
    email: "marcus@northwind.co",
    company: "Northwind",
    plan: Plan.FREE,
    status: CustomerStatus.TRIAL,
    mrr: 0,
    seats: 2,
    events: ["Started trial", "Created first project"],
  },
  {
    slug: "monzo-clone",
    name: "Elena Ruiz",
    email: "elena@monzoclone.dev",
    company: "Monzo Clone",
    plan: Plan.PRO,
    status: CustomerStatus.ACTIVE,
    mrr: 99,
    seats: 5,
    events: ["Payment received — €99", "Enabled 2FA"],
  },
];

async function main() {
  await prisma.user.upsert({
    where: { email: "dejan@gliakit.dev" },
    update: {},
    create: {
      email: "dejan@gliakit.dev",
      name: "Dejan Veljanoski",
      role: "OWNER",
      subscription: { create: { plan: Plan.SHIP } },
    },
  });

  for (const c of CUSTOMERS) {
    const { events, ...data } = c;
    await prisma.customer.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        ...data,
        events: { create: events.map((label) => ({ label })) },
      },
    });
  }
  console.log("Seeded ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
