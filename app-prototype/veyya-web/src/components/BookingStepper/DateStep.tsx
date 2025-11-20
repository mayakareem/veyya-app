"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { bookingDateSchema, type BookingDateData } from "@/lib/validations/booking";
import { format, addDays, isBefore, startOfDay } from "date-fns";

interface DateStepProps {
  providerId: string;
  initialData?: Partial<BookingDateData>;
  onNext: (data: BookingDateData) => void;
}

export default function DateStep({ providerId, initialData, onNext }: DateStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookingDateData>({
    resolver: zodResolver(bookingDateSchema),
    defaultValues: initialData,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setValue("date", format(date, "yyyy-MM-dd"));
    }
  };

  const onSubmit = (data: BookingDateData) => {
    onNext(data);
  };

  // Disable dates before today and more than 60 days in future
  const disabledDates = (date: Date) => {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 60);
    return isBefore(date, today) || isBefore(maxDate, date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Choose when you'd like to book this service. Available dates are shown below.
        </p>

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={disabledDates}
            className="rounded-md border"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
              day_hidden: "invisible",
            }}
          />
        </div>

        {errors.date && (
          <p className="text-sm text-destructive mt-4" role="alert">
            {errors.date.message}
          </p>
        )}

        {selectedDate && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Selected Date:</p>
            <p className="text-lg">{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <div></div>
        <Button
          type="submit"
          size="lg"
          disabled={!selectedDate}
          aria-label="Continue to time selection"
        >
          Continue to Time →
        </Button>
      </div>
    </form>
  );
}
