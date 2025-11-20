import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'serviceCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Fine-grained classification',
      options: {
        list: [
          { title: 'Nails', value: 'nails' },
          { title: 'Hair', value: 'hair' },
          { title: 'Makeup', value: 'makeup' },
          { title: 'Lashes', value: 'lashes' },
          { title: 'Massage', value: 'massage' },
          { title: 'Dog Grooming', value: 'dog_grooming' },
          { title: 'Cat Grooming', value: 'cat_grooming' },
          { title: 'Pet Walking', value: 'pet_walking' },
          { title: 'Pet Sitting', value: 'pet_sitting' },
          { title: 'Deep Cleaning', value: 'deep_cleaning' },
          { title: 'Regular Cleaning', value: 'regular_cleaning' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'th', title: 'Thai', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 5 },
        { name: 'th', title: 'Thai', type: 'text', rows: 5 },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'object',
      description: 'Brief one-liner for cards',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.max(100) },
        { name: 'th', title: 'Thai', type: 'string', validation: (Rule) => Rule.max(100) },
      ],
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (THB)',
      type: 'number',
      description: 'Price in THB',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'durationMinutes',
      title: 'Duration (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(15),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addOns',
      title: 'Add-Ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nameEn', title: 'Name (English)', type: 'string' },
            { name: 'nameTh', title: 'Name (Thai)', type: 'string' },
            { name: 'price', title: 'Price (THB)', type: 'number' },
            { name: 'durationMinutes', title: 'Duration (minutes)', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleTh: 'title.th',
      category: 'category.title.en',
      price: 'basePrice',
      media: 'image',
      active: 'active',
    },
    prepare({ titleEn, titleTh, category, price, media, active }) {
      return {
        title: titleEn || titleTh,
        subtitle: `${category} | ฿${price} ${active ? '' : '(Inactive)'}`,
        media,
      };
    },
  },
});
