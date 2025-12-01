"use client";

interface Category {
  name: string;
  description: string;
  [key: string]: any;
}

interface Props {
  category: Category;
}

export default function CertificationCategoryClient({ category }: Props) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <p className="text-muted-foreground">{category.description}</p>
      <p className="mt-4 text-sm text-muted-foreground">
        This certification category page is under construction.
      </p>
    </div>
  );
}
