import { OnboardingData } from "@/app/providers/onboarding/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

type Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
};

export default function ServiceSelectionStep({ data, updateData }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    const current = data.selectedCategories || [];
    if (current.includes(category)) {
      // Remove category and all its subcategories
      updateData({
        selectedCategories: current.filter((c) => c !== category),
        selectedSubcategories: (data.selectedSubcategories || []).filter(
          (sub) => sub.categoryName !== category
        ),
      });
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      // Add category and expand it
      updateData({
        selectedCategories: [...current, category],
      });
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const toggleSubcategory = (categoryName: string, subcategoryName: string) => {
    const current = data.selectedSubcategories || [];
    const existing = current.find(
      (sub) =>
        sub.categoryName === categoryName &&
        sub.subcategoryName === subcategoryName
    );

    if (existing) {
      // Remove subcategory
      updateData({
        selectedSubcategories: current.filter(
          (sub) =>
            !(
              sub.categoryName === categoryName &&
              sub.subcategoryName === subcategoryName
            )
        ),
      });
    } else {
      // Add subcategory with empty experience and certifications
      updateData({
        selectedSubcategories: [
          ...current,
          {
            categoryName,
            subcategoryName,
            yearsOfExperience: "",
            certifications: "",
          },
        ],
      });
    }
  };

  const updateSubcategoryDetails = (
    categoryName: string,
    subcategoryName: string,
    field: "yearsOfExperience" | "certifications",
    value: string
  ) => {
    const current = data.selectedSubcategories || [];
    const updated = current.map((sub) =>
      sub.categoryName === categoryName &&
      sub.subcategoryName === subcategoryName
        ? { ...sub, [field]: value }
        : sub
    );
    updateData({ selectedSubcategories: updated });
  };

  const isSubcategorySelected = (
    categoryName: string,
    subcategoryName: string
  ) => {
    return (data.selectedSubcategories || []).some(
      (sub) =>
        sub.categoryName === categoryName &&
        sub.subcategoryName === subcategoryName
    );
  };

  const getSubcategoryDetails = (
    categoryName: string,
    subcategoryName: string
  ) => {
    return (data.selectedSubcategories || []).find(
      (sub) =>
        sub.categoryName === categoryName &&
        sub.subcategoryName === subcategoryName
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Service Selection</h2>
        <p className="text-muted-foreground">
          Select the service categories and specific subcategories you have
          experience in
        </p>
      </div>

      {/* Category and Subcategory Selection */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>
            Service Categories & Subcategories{" "}
            <span className="text-red-500">*</span>
          </Label>
          <span className="text-sm text-muted-foreground">
            {(data.selectedSubcategories || []).length} subcategories selected
          </span>
        </div>

        <div className="space-y-4">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = category.Icon;
            const isCategorySelected =
              data.selectedCategories?.includes(category.name);
            const isExpanded = expandedCategories.includes(category.name);

            return (
              <div
                key={category.name}
                className={`border rounded-lg transition-all ${
                  isCategorySelected ? "border-primary bg-primary/5" : ""
                }`}
              >
                {/* Category Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isCategorySelected}
                      onCheckedChange={() => toggleCategory(category.name)}
                      className="mt-1"
                    />
                    <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    </div>
                    {isCategorySelected && (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </div>

                {/* Subcategories - Show when category is selected */}
                {isCategorySelected && (
                  <div className="px-4 pb-4 space-y-3 border-t bg-muted/30">
                    <p className="text-sm font-medium text-muted-foreground pt-4 mb-2">
                      Select specific services within {category.name}:
                    </p>

                    {category.services.map((subcategory) => {
                      const isSelected = isSubcategorySelected(
                        category.name,
                        subcategory
                      );
                      const details = getSubcategoryDetails(
                        category.name,
                        subcategory
                      );

                      return (
                        <div
                          key={subcategory}
                          className={`border rounded-lg p-4 transition-all ${
                            isSelected
                              ? "border-primary bg-background"
                              : "bg-background hover:border-primary/50"
                          }`}
                        >
                          {/* Subcategory checkbox */}
                          <div
                            className="flex items-center gap-3 mb-3 cursor-pointer"
                            onClick={() =>
                              toggleSubcategory(category.name, subcategory)
                            }
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() =>
                                toggleSubcategory(category.name, subcategory)
                              }
                            />
                            <p className="font-medium">{subcategory}</p>
                          </div>

                          {/* Experience and Certifications - Show when selected */}
                          {isSelected && details && (
                            <div className="ml-8 space-y-3 border-t pt-3">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`exp-${category.name}-${subcategory}`}>
                                    Years of Experience{" "}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id={`exp-${category.name}-${subcategory}`}
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={details.yearsOfExperience}
                                    onChange={(e) =>
                                      updateSubcategoryDetails(
                                        category.name,
                                        subcategory,
                                        "yearsOfExperience",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g., 3"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    How many years have you been providing this
                                    service?
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`cert-${category.name}-${subcategory}`}>
                                    Certifications (Optional)
                                  </Label>
                                  <Textarea
                                    id={`cert-${category.name}-${subcategory}`}
                                    value={details.certifications}
                                    onChange={(e) =>
                                      updateSubcategoryDetails(
                                        category.name,
                                        subcategory,
                                        "certifications",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g., Certified Massage Therapist, Thai Massage Level 2"
                                    rows={3}
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    List any relevant certifications or training
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {(data.selectedSubcategories || []).length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Your Selected Services Summary
          </h3>
          <div className="space-y-2">
            {(data.selectedSubcategories || []).map((sub, index) => (
              <div
                key={index}
                className="text-sm flex items-center justify-between py-2 border-b last:border-0"
              >
                <span className="font-medium">
                  {sub.categoryName} → {sub.subcategoryName}
                </span>
                <span className="text-muted-foreground">
                  {sub.yearsOfExperience
                    ? `${sub.yearsOfExperience} years`
                    : "Experience not set"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
