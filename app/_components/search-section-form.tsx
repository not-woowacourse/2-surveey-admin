'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useSetRecoilState } from 'recoil';

import { formValuesAtom } from '@/atoms/form-values-atom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type FormValues, formSchema } from '@/constants/form';

type SearchSectionFormProps = {
  defaultFormValues: FormValues | undefined;
};

const SearchSectionForm = ({ defaultFormValues }: SearchSectionFormProps) => {
  const setFormValues = useSetRecoilState(formValuesAtom);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = (values: FormValues) => {
    setFormValues(values);
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-0"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <FormField
            control={methods.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className="md:w-60">
                <FormLabel className="text-sm">Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="예) Yongjun Park" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="schemaSlug"
            render={({ field }) => (
              <FormItem className="md:w-60">
                <FormLabel className="text-sm">Schema Slug</FormLabel>
                <FormControl>
                  <Input placeholder="예) umore-2024" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchSectionForm;
