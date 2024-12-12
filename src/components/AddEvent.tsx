import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
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

    startTimestamp: z.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, {
      message: "Start timestamp must be in HH:MM format (24-hour clock)",
    }),

    endTimestamp: z.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, {
      message: "End timestamp must be in HH:MM format (24-hour clock)",
    }),

    description: z.string().max(1000, {
      message: "Description must be at most 1000 characters long",
    }),
  })
  .superRefine((data, ctx) => {
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = timeToMinutes(data.startTimestamp);
    const endMinutes = timeToMinutes(data.endTimestamp);

    if (startMinutes >= endMinutes) {
      ctx.addIssue({
        code: "custom",
        path: ["startTimestamp"],
        message: "Start time must be earlier than end time",
      });
    }
  });

const AddEvent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startTimestamp: "",
      endTimestamp: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>
                Title must be between 2 and 100 characters long.
              </FormDescription>
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
              <FormDescription>
                Enter the start time in 24-hour format (HH:MM).
              </FormDescription>
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
              <FormDescription>
                Enter the end time in 24-hour format (HH:MM).
              </FormDescription>
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
              <FormDescription>
                Description must be at most 1000 characters long.
              </FormDescription>
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
