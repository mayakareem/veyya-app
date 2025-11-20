"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBookingAction } from "@/actions/bookings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  slotId: z.string().min(1, "Please select a time slot"),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type Service = {
  id: string;
  title: string;
  durationMin: number;
  price: number;
};

type Slot = {
  id: string;
  start: Date;
  capacity: number;
};

type BookingFormProps = {
  providerId: string;
  services: Service[];
  slots: Slot[];
  defaultServiceId: string;
};

export default function BookingForm({
  providerId,
  services,
  slots,
  defaultServiceId,
}: BookingFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: defaultServiceId,
      slotId: slots[0]?.id || "",
      address: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await createBookingAction({
        providerId,
        serviceId: values.serviceId,
        slotId: values.slotId,
        address: values.address,
        notes: values.notes,
      });

      if (result.ok) {
        toast.success("Booking created successfully!");
        router.push(`/user/bookings`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create booking");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title} — {s.durationMin} min — ฿
                      {(s.price / 100).toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slotId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time slot</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {slots.map((sl) => (
                    <SelectItem key={sl.id} value={sl.id}>
                      {new Date(sl.start).toLocaleString()} (cap {sl.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Street, City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requests…" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Booking..." : "Confirm booking"}
        </Button>
      </form>
    </Form>
  );
}
