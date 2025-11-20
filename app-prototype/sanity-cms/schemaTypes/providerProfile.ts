import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'providerProfile',
  title: 'Provider Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'prismaId',
      title: 'Prisma Provider ID',
      type: 'string',
      description: 'Link to ProviderProfile.id from Prisma database',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Provider Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Approval', value: 'PENDING_APPROVAL' },
          { title: 'Approved', value: 'APPROVED' },
          { title: 'Suspended', value: 'SUSPENDED' },
          { title: 'Rejected', value: 'REJECTED' },
        ],
      },
      initialValue: 'PENDING_APPROVAL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      description: 'Full provider biography',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
      description: 'Brief description for provider cards',
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Cover/hero image for profile page',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(12),
      description: 'Up to 12 portfolio images',
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description: 'Weighted average rating (calculated)',
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'responseRate',
      title: 'Response Rate',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1),
      description: 'Decimal 0-1 (e.g., 0.95 = 95%)',
    }),
    defineField({
      name: 'onTimeRate',
      title: 'On-Time Rate',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1),
      description: 'Decimal 0-1 (e.g., 0.98 = 98%)',
    }),
    defineField({
      name: 'totalBookings',
      title: 'Total Bookings',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (฿)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Starting price for services',
    }),
    defineField({
      name: 'categories',
      title: 'Service Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Beauty', value: 'Beauty' },
          { title: 'Nails', value: 'Nails' },
          { title: 'Hair', value: 'Hair' },
          { title: 'Makeup', value: 'Makeup' },
          { title: 'Pet Care', value: 'Pet Care' },
          { title: 'Cleaning', value: 'Cleaning' },
          { title: 'Wellness', value: 'Wellness' },
          { title: 'Fitness', value: 'Fitness' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'English', value: 'English' },
          { title: 'Thai', value: 'Thai' },
          { title: 'Mandarin', value: 'Mandarin' },
          { title: 'Japanese', value: 'Japanese' },
        ],
      },
    }),
    defineField({
      name: 'serviceRadius',
      title: 'Service Radius (km)',
      type: 'number',
      description: 'How far provider will travel',
      initialValue: 10,
    }),
    defineField({
      name: 'location',
      title: 'Base Location',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'number' },
        { name: 'lng', title: 'Longitude', type: 'number' },
        { name: 'address', title: 'Address', type: 'string' },
      ],
      description: 'Provider base location for distance calculations',
    }),
    defineField({
      name: 'nextAvailableISO',
      title: 'Next Available Slot',
      type: 'datetime',
      description: 'Next available booking time',
    }),
    defineField({
      name: 'verifiedBadge',
      title: 'Veyya Verified Badge',
      type: 'boolean',
      initialValue: false,
      description: 'Awarded when: 100% profile, 10+ bookings, 4.5+ rating, 95%+ response',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'categories',
      rating: 'rating',
      status: 'status',
      media: 'profilePhoto',
    },
    prepare(selection) {
      const { title, subtitle, rating, status, media } = selection;
      return {
        title,
        subtitle: `${subtitle?.join(', ')} • ${rating ? `⭐ ${rating.toFixed(1)}` : 'No rating'} • ${status}`,
        media,
      };
    },
  },
});
