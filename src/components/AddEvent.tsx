import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z
  .object({
    title: z
      .string()
      .min(2, {
        message: "Title must be at least 2 characters long",
      })
      .max(100, {
        message: "Title must be at most 100 characters long",
      }),

    type: z.enum(["personal", "work", "casual"], {
      errorMap: () => ({
        message: "Please select a valid type",
      }),
    }),

    startTimestamp: z.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, {
      message: "Start timestamp must be in HH:MM format (24-hour clock)",
    }),

    endTimestamp: z.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, {
      message: "End timestamp must be in HH:MM format (24-hour clock)",
    }),

    description: z.string().max(1000, {
      message: "Description must be at most 1000 characters long",
    }),

    date: z.date(),
  })
  .superRefine((data, ctx) => {
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = timeToMinutes(data.startTimestamp);
    const endMinutes = timeToMinutes(data.endTimestamp);

    // Ensure start time is earlier than end time
    if (startMinutes >= endMinutes) {
      ctx.addIssue({
        code: "custom",
        path: ["startTimestamp"],
        message: "Start time must be earlier than end time",
      });
    }

    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");

    const isOverlapping = existingEvents.some((event: any) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      const formDate = data.date.toISOString().split("T")[0];

      if (eventDate === formDate) {
        const eventStart = timeToMinutes(event.startTimestamp);
        const eventEnd = timeToMinutes(event.endTimestamp);

        // Overlap logic: check if time intervals intersect
        return (
          (startMinutes < eventEnd && endMinutes > eventStart) || // new event overlaps an existing event
          (startMinutes >= eventStart && startMinutes < eventEnd)
        );
      }

      return false;
    });

    if (isOverlapping) {
      ctx.addIssue({
        code: "custom",
        path: ["startTimestamp"],
        message: "Event times overlap with an existing event",
      });
    }
  });

interface AddEventProps {
  selectedDate: Date;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AddEvent: React.FC<AddEventProps> = ({
  selectedDate,
  setIsModalOpen,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "personal",
      startTimestamp: "",
      endTimestamp: "",
      description: "",
      date: selectedDate,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const newEvent = {
      title: data.title,
      type: data.type,
      startTimestamp: data.startTimestamp,
      endTimestamp: data.endTimestamp,
      description: data.description,
      date: data.date.toISOString(),
    };

    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const updatedEvents = [...existingEvents, newEvent];

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setIsModalOpen(false);

    console.log("Event added", newEvent);
  }

  const typeOptions = [
    { value: "personal", label: "Personal", color: "bg-blue-500" },
    { value: "work", label: "Work", color: "bg-red-500" },
    { value: "casual", label: "Casual", color: "bg-green-500" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  {typeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                        className="hidden"
                      />
                      <span
                        className={`relative w-6 h-6 rounded-full ${option.color} flex items-center justify-center`}>
                        {field.value === option.value && (
                          <span className="w-3 h-3 rounded-full bg-white"></span>
                        )}
                      </span>
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTimestamp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input placeholder="HH:MM (e.g., 09:15)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTimestamp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input placeholder="HH:MM (e.g., 22:16)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <div className="mt-1">
                <FormControl>
                  <textarea
                    placeholder="Enter a brief description"
                    {...field}
                    className="textarea w-full border border-gray-300"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddEvent;
