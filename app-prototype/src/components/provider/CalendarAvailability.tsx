"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, X, Check, Repeat, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlot {
  start: string;
  end: string;
}

interface RecurringAvailability {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  slots: TimeSlot[];
  enabled: boolean;
}

interface BlockedDate {
  id: string;
  date: string;
  reason: string;
}

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TIME_OPTIONS = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

// Mock initial data
const initialRecurringSchedule: RecurringAvailability[] = [
  {
    id: "r1",
    dayOfWeek: 1, // Monday
    slots: [{ start: "09:00", end: "17:00" }],
    enabled: true,
  },
  {
    id: "r2",
    dayOfWeek: 2, // Tuesday
    slots: [{ start: "09:00", end: "17:00" }],
    enabled: true,
  },
  {
    id: "r3",
    dayOfWeek: 3, // Wednesday
    slots: [{ start: "09:00", end: "17:00" }],
    enabled: true,
  },
  {
    id: "r4",
    dayOfWeek: 4, // Thursday
    slots: [{ start: "09:00", end: "17:00" }],
    enabled: true,
  },
  {
    id: "r5",
    dayOfWeek: 5, // Friday
    slots: [{ start: "09:00", end: "17:00" }],
    enabled: true,
  },
  {
    id: "r6",
    dayOfWeek: 6, // Saturday
    slots: [{ start: "10:00", end: "15:00" }],
    enabled: true,
  },
  {
    id: "r0",
    dayOfWeek: 0, // Sunday
    slots: [],
    enabled: false,
  },
];

const initialBlockedDates: BlockedDate[] = [
  {
    id: "b1",
    date: "2025-12-25",
    reason: "Christmas Holiday",
  },
  {
    id: "b2",
    date: "2026-01-01",
    reason: "New Year's Day",
  },
];

export default function CalendarAvailability() {
  const [recurringSchedule, setRecurringSchedule] = useState<RecurringAvailability[]>(
    initialRecurringSchedule.sort((a, b) => a.dayOfWeek - b.dayOfWeek)
  );
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(initialBlockedDates);
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);
  const [showBlockDateDialog, setShowBlockDateDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newSlot, setNewSlot] = useState<TimeSlot>({ start: "09:00", end: "17:00" });
  const [blockDate, setBlockDate] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const toggleDayEnabled = (dayOfWeek: number) => {
    setRecurringSchedule(
      recurringSchedule.map((day) =>
        day.dayOfWeek === dayOfWeek ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const addTimeSlot = () => {
    if (selectedDay === null) return;

    setRecurringSchedule(
      recurringSchedule.map((day) =>
        day.dayOfWeek === selectedDay
          ? { ...day, slots: [...day.slots, newSlot] }
          : day
      )
    );

    setShowAddSlotDialog(false);
    setNewSlot({ start: "09:00", end: "17:00" });
    setSelectedDay(null);
  };

  const removeTimeSlot = (dayOfWeek: number, slotIndex: number) => {
    setRecurringSchedule(
      recurringSchedule.map((day) =>
        day.dayOfWeek === dayOfWeek
          ? { ...day, slots: day.slots.filter((_, idx) => idx !== slotIndex) }
          : day
      )
    );
  };

  const addBlockedDate = () => {
    if (!blockDate) return;

    const newBlock: BlockedDate = {
      id: `b${Date.now()}`,
      date: blockDate,
      reason: blockReason || "Unavailable",
    };

    setBlockedDates([...blockedDates, newBlock].sort((a, b) => a.date.localeCompare(b.date)));
    setShowBlockDateDialog(false);
    setBlockDate("");
    setBlockReason("");
  };

  const removeBlockedDate = (id: string) => {
    setBlockedDates(blockedDates.filter((date) => date.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Recurring Weekly Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Repeat className="h-5 w-5 text-primary" />
                Recurring Weekly Schedule
              </CardTitle>
              <CardDescription>
                Set your regular availability for each day of the week
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recurringSchedule.map((day) => (
              <div
                key={day.id}
                className={`p-4 border rounded-lg ${
                  day.enabled ? "bg-background" : "bg-muted/50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={day.enabled}
                      onCheckedChange={() => toggleDayEnabled(day.dayOfWeek)}
                    />
                    <div>
                      <Label className="text-base font-semibold">
                        {DAYS_OF_WEEK[day.dayOfWeek]}
                      </Label>
                      {day.slots.length > 0 && day.enabled && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {day.slots.length} time slot{day.slots.length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  {day.enabled && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedDay(day.dayOfWeek);
                        setShowAddSlotDialog(true);
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Slot
                    </Button>
                  )}
                </div>

                {day.enabled && day.slots.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {day.slots.map((slot, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-1.5"
                      >
                        <Clock className="h-3 w-3" />
                        {slot.start} - {slot.end}
                        <button
                          onClick={() => removeTimeSlot(day.dayOfWeek, idx)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {day.enabled && day.slots.length === 0 && (
                  <div className="text-sm text-muted-foreground mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                    No time slots added. Add slots to accept bookings on {DAYS_OF_WEEK[day.dayOfWeek]}.
                  </div>
                )}

                {!day.enabled && (
                  <div className="text-sm text-muted-foreground mt-3">
                    Unavailable - toggle to enable bookings
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blocked Dates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-500" />
                Blocked Dates
              </CardTitle>
              <CardDescription>
                Block specific dates when you're unavailable
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBlockDateDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Block Date
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {blockedDates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No blocked dates</p>
            </div>
          ) : (
            <div className="space-y-2">
              {blockedDates.map((blocked) => (
                <div
                  key={blocked.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-red-50"
                >
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">
                        {new Date(blocked.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{blocked.reason}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeBlockedDate(blocked.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Time Slot Dialog */}
      <Dialog open={showAddSlotDialog} onOpenChange={setShowAddSlotDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Time Slot</DialogTitle>
            <DialogDescription>
              {selectedDay !== null && `Add a time slot for ${DAYS_OF_WEEK[selectedDay]}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="mb-2 block">Start Time</Label>
              <Select
                value={newSlot.start}
                onValueChange={(value) => setNewSlot({ ...newSlot, start: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">End Time</Label>
              <Select
                value={newSlot.end}
                onValueChange={(value) => setNewSlot({ ...newSlot, end: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addTimeSlot} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Time Slot
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Block Date Dialog */}
      <Dialog open={showBlockDateDialog} onOpenChange={setShowBlockDateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Block a Date</DialogTitle>
            <DialogDescription>
              Select a date when you'll be unavailable
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="block-date" className="mb-2 block">
                Date
              </Label>
              <input
                id="block-date"
                type="date"
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="block-reason" className="mb-2 block">
                Reason (Optional)
              </Label>
              <input
                id="block-reason"
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g., Holiday, Personal day"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <Button onClick={addBlockedDate} className="w-full" disabled={!blockDate}>
              <Ban className="h-4 w-4 mr-2" />
              Block This Date
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
