/**
 * Veyya Sanity CMS Schema Definitions
 *
 * Purpose: Define content types managed in Sanity CMS
 * - Service Catalog (categories, services)
 * - Static/Dynamic Content Pages (FAQ, Terms, Blog)
 * - Promotional Content (banners, campaigns)
 *
 * Synced to PostgreSQL `services` table via API integration
 *
 * @version 1.0
 * @date 2025-10-25
 */

import { defineField, defineType, defineArrayMember } from 'sanity';

// ============================================================================
// SERVICE CATALOG SCHEMAS
// ============================================================================

/**
 * Service Category
 * Top-level service groupings (Beauty, Pet Care, Cleaning)
 */
export const serviceCategory = defineType({
  name: 'serviceCategory',
  title: 'Service Category',
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
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'th', title: 'Thai', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from icon library (e.g., "scissors", "paw", "sparkles")',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
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
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show prominently on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Hide category from app if inactive',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleTh: 'title.th',
      media: 'image',
      active: 'active',
    },
    prepare({ titleEn, titleTh, media, active }) {
      return {
        title: titleEn || titleTh,
        subtitle: `${titleTh || ''} ${active ? '' : '(Inactive)'}`,
        media,
      };
    },
  },
});

/**
 * Service
 * Individual services within categories
 */
export const service = defineType({
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
      description: 'Fine-grained classification (e.g., "nails", "hair", "dog_grooming")',
      options: {
        list: [
          // Beauty
          { title: 'Nails', value: 'nails' },
          { title: 'Hair', value: 'hair' },
          { title: 'Makeup', value: 'makeup' },
          { title: 'Lashes', value: 'lashes' },
          { title: 'Massage', value: 'massage' },
          // Pet Care
          { title: 'Dog Grooming', value: 'dog_grooming' },
          { title: 'Cat Grooming', value: 'cat_grooming' },
          { title: 'Pet Walking', value: 'pet_walking' },
          { title: 'Pet Sitting', value: 'pet_sitting' },
          // Cleaning
          { title: 'Deep Cleaning', value: 'deep_cleaning' },
          { title: 'Regular Cleaning', value: 'regular_cleaning' },
          { title: 'Move In/Out', value: 'move_in_out' },
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
      description: 'Brief one-liner for card displays',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.max(100) },
        { name: 'th', title: 'Thai', type: 'string', validation: (Rule) => Rule.max(100) },
      ],
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (THB)',
      type: 'number',
      description: 'Price in THB (will be converted to minor units in database)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'object',
      description: 'Optional: Show price as range if varies significantly',
      fields: [
        { name: 'min', title: 'Min (THB)', type: 'number' },
        { name: 'max', title: 'Max (THB)', type: 'number' },
      ],
    }),
    defineField({
      name: 'durationMinutes',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'Typical service duration',
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
      name: 'gallery',
      title: 'Image Gallery',
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
    }),
    defineField({
      name: 'requiredCertifications',
      title: 'Required Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Certifications providers must have to offer this service',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Searchable keywords (e.g., "organic", "eco-friendly", "hypoallergenic")',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured services section',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Hide service from app if inactive',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within category',
      initialValue: 0,
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
      description: 'Optional add-ons clients can select during booking',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'questionEn', title: 'Question (English)', type: 'string' },
            { name: 'questionTh', title: 'Question (Thai)', type: 'string' },
            { name: 'answerEn', title: 'Answer (English)', type: 'text', rows: 3 },
            { name: 'answerTh', title: 'Answer (Thai)', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitleEn', title: 'Meta Title (English)', type: 'string' },
        { name: 'metaTitleTh', title: 'Meta Title (Thai)', type: 'string' },
        { name: 'metaDescriptionEn', title: 'Meta Description (English)', type: 'text', rows: 2 },
        { name: 'metaDescriptionTh', title: 'Meta Description (Thai)', type: 'text', rows: 2 },
      ],
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

// ============================================================================
// CONTENT PAGE SCHEMAS
// ============================================================================

/**
 * Portable Text Block Configuration
 * Reusable rich text configuration
 */
const portableTextBlock = {
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H1', value: 'h1' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
    { title: 'H4', value: 'h4' },
    { title: 'Quote', value: 'blockquote' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Code', value: 'code' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
          { name: 'href', type: 'url', title: 'URL' },
          {
            name: 'blank',
            type: 'boolean',
            title: 'Open in new tab',
            initialValue: false,
          },
        ],
      },
    ],
  },
};

/**
 * Static Page (FAQ, Terms, Privacy, etc.)
 */
export const staticPage = defineType({
  name: 'staticPage',
  title: 'Static Page',
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
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [portableTextBlock as any],
        },
        {
          name: 'th',
          title: 'Thai',
          type: 'array',
          of: [portableTextBlock as any],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'FAQ', value: 'faq' },
          { title: 'Terms of Service', value: 'terms' },
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'About Us', value: 'about' },
          { title: 'Safety Guidelines', value: 'safety' },
          { title: 'Help Center', value: 'help' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Reviewed Date',
      type: 'date',
      description: 'Legal/compliance review date',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitleEn', title: 'Meta Title (English)', type: 'string' },
        { name: 'metaTitleTh', title: 'Meta Title (Thai)', type: 'string' },
        { name: 'metaDescriptionEn', title: 'Meta Description (English)', type: 'text', rows: 2 },
        { name: 'metaDescriptionTh', title: 'Meta Description (Thai)', type: 'text', rows: 2 },
      ],
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleTh: 'title.th',
      pageType: 'pageType',
    },
    prepare({ titleEn, titleTh, pageType }) {
      return {
        title: titleEn || titleTh,
        subtitle: pageType.toUpperCase(),
      };
    },
  },
});

/**
 * Blog Post (for content marketing)
 */
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'th', title: 'Thai', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            portableTextBlock as any,
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', title: 'Alt Text', type: 'string' },
                { name: 'caption', title: 'Caption', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'th',
          title: 'Thai',
          type: 'array',
          of: [
            portableTextBlock as any,
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', title: 'Alt Text', type: 'string' },
                { name: 'caption', title: 'Caption', type: 'string' },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Beauty Tips', value: 'beauty_tips' },
          { title: 'Pet Care', value: 'pet_care' },
          { title: 'Home Maintenance', value: 'home_maintenance' },
          { title: 'Provider Stories', value: 'provider_stories' },
          { title: 'Company News', value: 'company_news' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured posts section',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitleEn', title: 'Meta Title (English)', type: 'string' },
        { name: 'metaTitleTh', title: 'Meta Title (Thai)', type: 'string' },
        { name: 'metaDescriptionEn', title: 'Meta Description (English)', type: 'text', rows: 2 },
        { name: 'metaDescriptionTh', title: 'Meta Description (Thai)', type: 'text', rows: 2 },
      ],
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleTh: 'title.th',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare({ titleEn, titleTh, media, publishedAt }) {
      return {
        title: titleEn || titleTh,
        subtitle: new Date(publishedAt).toLocaleDateString(),
        media,
      };
    },
  },
});

// ============================================================================
// PROMOTIONAL CONTENT SCHEMAS
// ============================================================================

/**
 * Banner (Homepage banners, promotional carousels)
 */
export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Internal Name',
      type: 'string',
      description: 'For internal reference only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'th', title: 'Thai', type: 'string' },
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'th', title: 'Thai', type: 'string' },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Call-to-Action Text',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'th', title: 'Thai', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'Internal route or external URL',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show banner in app',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in carousel',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      media: 'image',
      active: 'active',
      startDate: 'startDate',
    },
    prepare({ name, media, active, startDate }) {
      return {
        title: name,
        subtitle: `${new Date(startDate).toLocaleDateString()} ${active ? '' : '(Inactive)'}`,
        media,
      };
    },
  },
});

// ============================================================================
// APP CONFIGURATION SCHEMAS
// ============================================================================

/**
 * App Settings (Global configuration)
 */
export const appSettings = defineType({
  name: 'appSettings',
  title: 'App Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'boolean',
      description: 'Show maintenance page if enabled',
      initialValue: false,
    }),
    defineField({
      name: 'maintenanceMessage',
      title: 'Maintenance Message',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'th', title: 'Thai', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'serviceCategory' }] }],
      description: 'Categories shown on homepage',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
    }),
    defineField({
      name: 'supportPhone',
      title: 'Support Phone',
      type: 'string',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'line', title: 'LINE ID', type: 'string' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'App Settings',
        subtitle: 'Global application configuration',
      };
    },
  },
});

// ============================================================================
// SCHEMA EXPORT
// ============================================================================

/**
 * Export all schemas for Sanity Studio configuration
 */
export const schemaTypes = [
  // Service Catalog
  serviceCategory,
  service,

  // Content Pages
  staticPage,
  blogPost,

  // Promotional
  banner,

  // Configuration
  appSettings,
];

// ============================================================================
// GROQ QUERY EXAMPLES
// ============================================================================

/**
 * Example GROQ Queries for fetching data
 *
 * 1. Get all active service categories with services:
 *
 * const query = `*[_type == "serviceCategory" && active == true] | order(displayOrder asc) {
 *   _id,
 *   slug,
 *   title,
 *   description,
 *   icon,
 *   "imageUrl": image.asset->url,
 *   featured,
 *   "services": *[_type == "service" && references(^._id) && active == true] | order(displayOrder asc) {
 *     _id,
 *     slug,
 *     title,
 *     shortDescription,
 *     basePrice,
 *     durationMinutes,
 *     "imageUrl": image.asset->url
 *   }
 * }`;
 *
 * 2. Get service by slug with full details:
 *
 * const query = `*[_type == "service" && slug.current == $slug][0] {
 *   _id,
 *   title,
 *   description,
 *   basePrice,
 *   priceRange,
 *   durationMinutes,
 *   "imageUrl": image.asset->url,
 *   "gallery": gallery[].asset->url,
 *   requiredCertifications,
 *   tags,
 *   addOns,
 *   faqs,
 *   "category": category-> {
 *     title,
 *     slug
 *   }
 * }`;
 *
 * 3. Get static page by slug:
 *
 * const query = `*[_type == "staticPage" && slug.current == $slug][0] {
 *   _id,
 *   title,
 *   content,
 *   pageType,
 *   lastReviewedAt
 * }`;
 *
 * 4. Get active banners for homepage:
 *
 * const query = `*[_type == "banner" && active == true && startDate <= now() && (endDate == null || endDate >= now())] | order(displayOrder asc) {
 *   _id,
 *   title,
 *   subtitle,
 *   "imageUrl": image.asset->url,
 *   ctaText,
 *   ctaLink
 * }`;
 *
 * 5. Get blog posts (paginated):
 *
 * const query = `*[_type == "blogPost"] | order(publishedAt desc) [$start...$end] {
 *   _id,
 *   slug,
 *   title,
 *   excerpt,
 *   "featuredImageUrl": featuredImage.asset->url,
 *   author,
 *   categories,
 *   publishedAt,
 *   featured
 * }`;
 *
 * 6. Sync services to PostgreSQL (backend job):
 *
 * const query = `*[_type == "service"] {
 *   _id,
 *   slug,
 *   "category": category->slug.current,
 *   subcategory,
 *   title,
 *   description,
 *   basePrice,
 *   durationMinutes,
 *   "imageUrl": image.asset->url,
 *   requiredCertifications,
 *   active,
 *   displayOrder,
 *   _updatedAt
 * }`;
 */
