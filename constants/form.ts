import z from 'zod';

const formSchema = z.object({
  clientName: z.string().min(1),
  schemaSlug: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export { formSchema, type FormValues };
