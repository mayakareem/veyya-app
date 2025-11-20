import { OnboardingData } from "@/app/providers/onboarding/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";

type Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
};

export default function ServiceSelectionStep({ data, updateData }: Props) {
  const toggleCategory = (category: string) => {
    const current = data.selectedCategories || [];
    if (current.includes(category)) {
      updateData({
        selectedCategories: current.filter((c) => c !== category),
      });
    } else {
      updateData({
        selectedCategories: [...current, category],
      });
    }
  };

  const addService = () => {
    const newService = { name: "", price: "", duration: "", description: "" };
    updateData({ services: [...(data.services || []), newService] });
  };

  const removeService = (index: number) => {
    const updated = [...(data.services || [])];
    updated.splice(index, 1);
    updateData({ services: updated });
  };

  const updateService = (index: number, field: string, value: string) => {
    const updated = [...(data.services || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ services: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Service Selection</h2>
        <p className="text-muted-foreground">
          Select the service categories you offer and add your specific services with pricing
        </p>
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <Label>
          Service Categories <span className="text-red-500">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          Select all categories that apply to your services (you can select multiple)
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = category.Icon;
            return (
              <div
                key={category.name}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  data.selectedCategories?.includes(category.name)
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={data.selectedCategories?.includes(category.name)}
                    onCheckedChange={() => toggleCategory(category.name)}
                  />
                  <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.services.slice(0, 2).join(", ")}
                      {category.services.length > 2 && "..."}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Your Services <span className="text-red-500">*</span></Label>
            <p className="text-sm text-muted-foreground">
              Add the specific services you provide with pricing and details
            </p>
          </div>
          <Button onClick={addService} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {data.services && data.services.length > 0 ? (
          <div className="space-y-4">
            {data.services.map((service, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Service #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeService(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Service Name <span className="text-red-500">*</span></Label>
                    <Input
                      value={service.name}
                      onChange={(e) => updateService(index, "name", e.target.value)}
                      placeholder="e.g., Deep Tissue Massage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price (THB) <span className="text-red-500">*</span></Label>
                    <Input
                      type="number"
                      value={service.price}
                      onChange={(e) => updateService(index, "price", e.target.value)}
                      placeholder="e.g., 1200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration (minutes) <span className="text-red-500">*</span></Label>
                    <Input
                      type="number"
                      value={service.duration}
                      onChange={(e) => updateService(index, "duration", e.target.value)}
                      placeholder="e.g., 90"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateService(index, "description", e.target.value)}
                    placeholder="Brief description of this service..."
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No services added yet. Click "Add Service" to start.
            </p>
            <Button onClick={addService}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Service
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
