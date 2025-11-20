import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean up existing seed data
  console.log("Cleaning up existing data...");
  await prisma.availabilitySlot.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.serviceOffering.deleteMany({});
  await prisma.providerProfile.deleteMany({});
  await prisma.user.deleteMany({
    where: {
      email: {
        endsWith: "@veyya.com",
      },
    },
  });
  console.log("✓ Cleanup complete");

  // Create dummy users and providers
  const providers = [
    {
      email: "sophia.beauty@veyya.com",
      name: "Sophia Chen",
      displayName: "Sophia Chen Beauty Studio",
      shortBio: "Certified makeup artist with 8 years of experience. Specializing in bridal and editorial makeup.",
      categories: ["Beauty", "Makeup"],
      rating: 4.9,
      basePrice: 8000, // $80 in cents
      imageUrl: null,
      services: [
        { title: "Bridal Makeup", price: 15000, durationMin: 120, active: true },
        { title: "Evening Makeup", price: 8000, durationMin: 60, active: true },
        { title: "Makeup Lesson", price: 12000, durationMin: 90, active: true },
      ],
    },
    {
      email: "emma.nails@veyya.com",
      name: "Emma Rodriguez",
      displayName: "Emma's Nail Artistry",
      shortBio: "Award-winning nail technician. Expert in gel extensions, nail art, and Japanese manicures.",
      categories: ["Nails", "Beauty"],
      rating: 4.8,
      basePrice: 5000,
      imageUrl: null,
      services: [
        { title: "Gel Manicure", price: 4500, durationMin: 60, active: true },
        { title: "Nail Extensions", price: 8500, durationMin: 120, active: true },
        { title: "Pedicure Deluxe", price: 6000, durationMin: 75, active: true },
      ],
    },
    {
      email: "marco.hair@veyya.com",
      name: "Marco Santos",
      displayName: "Marco Hair Design",
      shortBio: "Celebrity hairstylist with international training. Cutting-edge techniques and organic products.",
      categories: ["Hair", "Beauty"],
      rating: 5.0,
      basePrice: 12000,
      imageUrl: null,
      services: [
        { title: "Haircut & Style", price: 12000, durationMin: 90, active: true },
        { title: "Balayage Color", price: 25000, durationMin: 180, active: true },
        { title: "Keratin Treatment", price: 18000, durationMin: 150, active: true },
      ],
    },
    {
      email: "lily.wellness@veyya.com",
      name: "Lily Thompson",
      displayName: "Lily Wellness & Massage",
      shortBio: "Licensed massage therapist specializing in deep tissue, Thai, and aromatherapy massage.",
      categories: ["Wellness"],
      rating: 4.7,
      basePrice: 9000,
      imageUrl: null,
      services: [
        { title: "Deep Tissue Massage", price: 11000, durationMin: 90, active: true },
        { title: "Thai Massage", price: 9500, durationMin: 60, active: true },
        { title: "Aromatherapy Session", price: 8000, durationMin: 75, active: true },
      ],
    },
    {
      email: "max.fitness@veyya.com",
      name: "Max Johnson",
      displayName: "Max Personal Training",
      shortBio: "Certified personal trainer and nutritionist. Transform your body with science-backed methods.",
      categories: ["Fitness", "Wellness"],
      rating: 4.9,
      basePrice: 7500,
      imageUrl: null,
      services: [
        { title: "Personal Training Session", price: 7500, durationMin: 60, active: true },
        { title: "Nutrition Consultation", price: 5000, durationMin: 45, active: true },
        { title: "Group Fitness Class", price: 3500, durationMin: 60, active: true },
      ],
    },
    {
      email: "charlie.petcare@veyya.com",
      name: "Charlie Brown",
      displayName: "Charlie's Pet Grooming",
      shortBio: "Professional pet groomer with 10 years experience. Gentle care for dogs and cats of all sizes.",
      categories: ["Pet Care"],
      rating: 4.8,
      basePrice: 6000,
      imageUrl: null,
      services: [
        { title: "Dog Bath & Groom", price: 6500, durationMin: 90, active: true },
        { title: "Cat Grooming", price: 5500, durationMin: 60, active: true },
        { title: "Nail Trim & Ear Cleaning", price: 3000, durationMin: 30, active: true },
      ],
    },
    {
      email: "maria.cleaning@veyya.com",
      name: "Maria Garcia",
      displayName: "Maria's Premium Cleaning",
      shortBio: "Eco-friendly cleaning service using organic products. Meticulous attention to detail.",
      categories: ["Cleaning"],
      rating: 4.6,
      basePrice: 8000,
      imageUrl: null,
      services: [
        { title: "Deep House Cleaning", price: 15000, durationMin: 240, active: true },
        { title: "Regular Maintenance", price: 8000, durationMin: 120, active: true },
        { title: "Move-in/Move-out Clean", price: 20000, durationMin: 300, active: true },
      ],
    },
    {
      email: "aisha.beauty@veyya.com",
      name: "Aisha Rahman",
      displayName: "Aisha Threading & Brows",
      shortBio: "Expert in eyebrow threading, tinting, and facial treatments. Natural, flawless results.",
      categories: ["Beauty"],
      rating: 4.9,
      basePrice: 3500,
      imageUrl: null,
      services: [
        { title: "Eyebrow Threading", price: 2500, durationMin: 20, active: true },
        { title: "Full Face Threading", price: 4000, durationMin: 30, active: true },
        { title: "Brow Tint & Shape", price: 3500, durationMin: 25, active: true },
      ],
    },
    {
      email: "tom.petwalking@veyya.com",
      name: "Tom Anderson",
      displayName: "Tom's Dog Walking Service",
      shortBio: "Reliable and experienced dog walker. Your furry friend will get exercise and love!",
      categories: ["Pet Care"],
      rating: 4.5,
      basePrice: 3000,
      imageUrl: null,
      services: [
        { title: "30-Min Dog Walk", price: 2500, durationMin: 30, active: true },
        { title: "1-Hour Dog Walk", price: 4000, durationMin: 60, active: true },
        { title: "Pet Sitting (per day)", price: 8000, durationMin: 480, active: true },
      ],
    },
    {
      email: "nina.hair@veyya.com",
      name: "Nina Patel",
      displayName: "Nina's Hair & Color Bar",
      shortBio: "Color specialist with expertise in vivid colors, ombre, and hair restoration treatments.",
      categories: ["Hair", "Beauty"],
      rating: 4.7,
      basePrice: 9500,
      imageUrl: null,
      services: [
        { title: "Full Color Service", price: 18000, durationMin: 150, active: true },
        { title: "Highlights", price: 14000, durationMin: 120, active: true },
        { title: "Hair Glossing Treatment", price: 9500, durationMin: 60, active: true },
      ],
    },
  ];

  // Create users and providers
  for (const providerData of providers) {
    console.log(`Creating provider: ${providerData.displayName}`);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: providerData.email,
        name: providerData.name,
        role: "PROVIDER",
      },
    });

    // Create provider profile
    const provider = await prisma.providerProfile.create({
      data: {
        userId: user.id,
        displayName: providerData.displayName,
        shortBio: providerData.shortBio,
        categories: providerData.categories,
        rating: providerData.rating,
        basePrice: providerData.basePrice,
        imageUrl: providerData.imageUrl,
      },
    });

    // Create services
    for (const service of providerData.services) {
      await prisma.serviceOffering.create({
        data: {
          providerId: provider.id,
          title: service.title,
          price: service.price,
          durationMin: service.durationMin,
          active: service.active,
        },
      });
    }

    // Create availability slots (next 7 days)
    const now = new Date();
    for (let day = 0; day < 7; day++) {
      for (let hour of [9, 11, 14, 16]) {
        const slotDate = new Date(now);
        slotDate.setDate(now.getDate() + day);
        slotDate.setHours(hour, 0, 0, 0);

        await prisma.availabilitySlot.create({
          data: {
            providerId: provider.id,
            start: slotDate,
            end: new Date(slotDate.getTime() + 90 * 60000), // 90 minutes
            capacity: 1,
          },
        });
      }
    }

    console.log(`✓ Created ${providerData.displayName} with services and availability`);
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
