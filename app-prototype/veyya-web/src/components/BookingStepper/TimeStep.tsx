"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { bookingTimeSchema, type BookingTimeData } from "@/lib/validations/booking";
import { cn } from "@/lib/utils";

interface TimeStepProps {
  providerId: string;
  selectedDate: string;
  initialData?: Partial<BookingTimeData>;
  onNext: (data: BookingTimeData) => void;
  onBack: () => void;
}

// Mock available time slots - in production, fetch from API
const generateTimeSlots = (date: string): string[] => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 18) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

export default function TimeStep({
  providerId,
  selectedDate,
  initialData,
  onNext,
  onBack,
}: TimeStepProps) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(
    initialData?.timeSlot || null
  );
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingTimeData>({
    resolver: zodResolver(bookingTimeSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    // Simulate API call to fetch available slots
    const fetchSlots = async () => {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/providers/${providerId}/availability?date=${selectedDate}`);
      // const data = await response.json();

      setTimeout(() => {
        const slots = generateTimeSlots(selectedDate);
        setAvailableSlots(slots);
        setLoading(false);
      }, 500);
    };

    fetchSlots();
  }, [providerId, selectedDate]);

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setValue("timeSlot", slot);
  };

  const onSubmit = (data: BookingTimeData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Select a Time</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Choose an available time slot for {selectedDate}
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleSlotSelect(slot)}
                    className={cn(
                      "py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all",
                      "hover:border-primary hover:bg-primary/5",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted"
                    )}
                    aria-pressed={isSelected}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            {availableSlots.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No available slots for this date.</p>
                <p className="text-sm mt-2">Please select a different date.</p>
              </div>
            )}
          </>
        )}

        {errors.timeSlot && (
          <p className="text-sm text-destructive mt-4" role="alert">
            {errors.timeSlot.message}
          </p>
        )}

        {selectedSlot && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Selected Time:</p>
            <p className="text-lg">{selectedSlot}</p>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          aria-label="Go back to date selection"
        >
          ← Back
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={!selectedSlot}
          aria-label="Continue to details"
        >
          Continue to Details →
        </Button>
      </div>
    </form>
  );
}
