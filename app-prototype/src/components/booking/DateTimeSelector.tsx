"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceDetail } from "@/lib/constants/categories";

interface DateTimeSelectorProps {
  service: ServiceDetail;
  onConfirm: (date: string, time: string) => void;
  onCancel: () => void;
}

// Generate available time slots (9 AM - 8 PM in 30-minute intervals)
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 20) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DateTimeSelector({
  service,
  onConfirm,
  onCancel,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const footerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate calendar days for the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    return date < today;
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDateSelect = (date: Date | null) => {
    if (!date || isDateDisabled(date)) return;
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Auto-scroll to footer when time is selected
  useEffect(() => {
    if (selectedTime && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedTime]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const dateStr = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      onConfirm(dateStr, selectedTime);
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const canGoToPrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const todayMonth = new Date(today.getFullYear(), today.getMonth());
    return prevMonth >= todayMonth;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Select Date & Time</h2>
            <p className="text-sm text-muted-foreground">{service.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Duration: {service.duration} minutes • ฿{service.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Select Date
                </h3>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPreviousMonth}
                  disabled={!canGoToPrevMonth()}
                  className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <div className="font-semibold">
                    {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                </div>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="border rounded-xl overflow-hidden bg-white">
                {/* Day headers */}
                <div className="grid grid-cols-7 bg-gray-50">
                  {DAYS_OF_WEEK.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium py-2 text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 bg-white">
                  {days.map((date, index) => {
                    const disabled = isDateDisabled(date);
                    const selected = isSameDay(date, selectedDate);
                    const isToday = date && isSameDay(date, today);

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        disabled={disabled}
                        className={`
                          aspect-square p-2 text-sm border-b border-r bg-white
                          transition-all
                          ${disabled ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
                          ${selected ? "!bg-primary text-primary-foreground font-bold hover:!bg-primary" : ""}
                          ${isToday && !selected ? "border-2 border-primary" : ""}
                        `}
                      >
                        {date ? date.getDate() : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-sm font-medium text-primary">Selected Date:</div>
                  <div className="text-sm mt-1">{formatSelectedDate()}</div>
                </div>
              )}
            </div>

            {/* Time Slots Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Select Time
                </h3>
              </div>

              {!selectedDate ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Please select a date first</p>
                </div>
              ) : (
                <div className="border rounded-xl p-4 max-h-[400px] overflow-y-auto bg-white">
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((time) => {
                      const selected = time === selectedTime;
                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`
                            py-3 px-2 text-sm rounded-lg border transition-all bg-white
                            ${selected
                              ? "!bg-primary text-primary-foreground border-primary font-semibold"
                              : "hover:bg-gray-50 hover:border-primary/50"
                            }
                          `}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedTime && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-sm font-medium text-primary">Selected Time:</div>
                  <div className="text-sm mt-1">{selectedTime}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div ref={footerRef} className="sticky bottom-0 bg-white border-t p-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="gap-2"
          >
            <Calendar className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
