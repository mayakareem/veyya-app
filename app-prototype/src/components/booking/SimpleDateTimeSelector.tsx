"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";

interface DateTimeSelectorProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

// Available time slots
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function SimpleDateTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimeSelectorProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

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

  const isSameDay = (date1: Date | null, date2: Date | null | undefined) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const canGoToPrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const todayMonth = new Date(today.getFullYear(), today.getMonth());
    return prevMonth >= todayMonth;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Select Date & Time</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose when you'd like us to provide this service
        </p>
      </div>

      {/* Date Selection */}
      <div>
        <Label className="mb-3 block flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Select Date
        </Label>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            disabled={!canGoToPrevMonth()}
            className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-semibold">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="border rounded-lg overflow-hidden bg-white">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-muted/50">
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
          <div className="grid grid-cols-7">
            {days.map((date, index) => {
              const disabled = isDateDisabled(date);
              const selected = isSameDay(date, selectedDate);
              const isToday = date && isSameDay(date, today);

              return (
                <button
                  key={index}
                  onClick={() => !disabled && date && onDateChange(date)}
                  disabled={disabled}
                  className={`
                    aspect-square p-2 text-sm border-b border-r bg-white
                    transition-all
                    ${disabled ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"}
                    ${selected ? "!bg-primary text-primary-foreground font-bold hover:!bg-primary" : ""}
                    ${isToday && !selected ? "border-2 border-primary/50" : ""}
                  `}
                >
                  {date ? date.getDate() : ""}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <Label className="mb-3 block flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Select Time
          </Label>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[300px] overflow-y-auto border rounded-lg p-3 bg-white">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => onTimeChange(time)}
                className={`p-2.5 border-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTime === time
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm font-medium text-primary mb-1">
            Selected Appointment
          </p>
          <p className="text-base font-semibold">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}
