import { prisma } from "@/lib/prisma";
import { requireProvider } from "@/lib/auth-helpers";
import { createService, deleteService, toggleServiceActive } from "@/actions/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function ProviderServicesPage() {
  const user = await requireProvider();

  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  const services = provider
    ? await prisma.serviceOffering.findMany({
        where: { providerId: provider.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-muted-foreground">
          Manage the services you offer to customers.
        </p>
      </div>

      {/* Create new service */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Add New Service</h2>
        <form action={createService} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Title *</label>
              <Input name="title" required placeholder="e.g. Haircut" />
            </div>
            <div>
              <label className="block text-sm mb-1">Duration (minutes) *</label>
              <Input type="number" name="durationMin" min={15} max={480} defaultValue={60} required />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              className="w-full rounded-md border p-2 min-h-[80px]"
              placeholder="Describe this service..."
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Price (minor units) *</label>
            <Input type="number" name="price" min={0} defaultValue={0} required placeholder="e.g. 5000" />
            <p className="text-xs text-muted-foreground mt-1">In cents/smallest currency unit</p>
          </div>

          <Button type="submit">Add Service</Button>
        </form>
      </div>

      {/* Existing services */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Your Services</h2>
        {services.length === 0 && (
          <p className="text-sm text-muted-foreground">No services yet. Add one above!</p>
        )}
        <ul className="space-y-3">
          {services.map((service) => (
            <li key={service.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{service.title}</h3>
                    <Badge variant={service.active ? "default" : "secondary"}>
                      {service.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  {service.description && (
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  )}
                  <div className="flex gap-4 text-sm">
                    <span><b>Duration:</b> {service.durationMin} min</span>
                    <span><b>Price:</b> {service.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <form action={async () => { "use server"; await toggleServiceActive(service.id); }}>
                    <Button variant="outline" size="sm">
                      {service.active ? "Deactivate" : "Activate"}
                    </Button>
                  </form>
                  <form action={async () => { "use server"; await deleteService(service.id); }}>
                    <Button variant="outline" size="sm">Delete</Button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <a className="underline text-sm" href="/provider">← Back to provider dashboard</a>
    </main>
  );
}
