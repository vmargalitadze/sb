/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@/lib/validators';
import { updateProduct } from '@/lib/actions/actions';
import { z } from 'zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import ImageUpload from '../../ImageUpload'; 
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { Controller } from "react-hook-form";
const BooleanSchema = z.object({
  type: z.enum(["MATTRESS", "PILLOW", "QUILT", "PAD"]),
  titleEn: z.string(),
  titleKa: z.string(),
  categoryEn: z.string(),
  categoryKa: z.string(),
  secondtext: z.string().optional(),
  secondtextEn: z.string().optional(),
  images: z.array(z.string()),
  // ⬇️⬇️⬇️⬇️ ამ ველების დამატება საჭიროა
  springTech: z.boolean().optional(),
  orthopaedic: z.boolean().optional(),
  breathable: z.boolean().optional(),
  doubleSided: z.boolean().optional(),
  knitte: z.boolean().optional(),
  wool: z.boolean().optional(),
  visco: z.boolean().optional(),
  dns: z.boolean().optional(),
  latex: z.boolean().optional(),
  washable: z.boolean().optional(),
});
const categoryOptions = [
  { en: 'Mattress', ka: 'მატრასი' },
  { en: 'Pillow', ka: 'ბალიში' },
  { en: 'Quilt', ka: 'საბნები' },
  { en: 'Pad', ka: 'პადი' },
];

const heightOptions = [
  { text: '6 სმ', value: '6' },
  { text: '7 სმ', value: '7' },
  { text: '25 სმ', value: '25' },
  { text: '26 სმ', value: '26' },
  { text: '27 სმ', value: '27' },
  { text: '28 სმ', value: '28' },
  { text: '30 სმ', value: '30' },
  { text: '32 სმ', value: '32' },
  { text: '33 სმ', value: '33' },
];


const checkboxOptions: { name: keyof z.infer<typeof BooleanSchema>; label: string }[] = [
  { name: "springTech", label: "Spring Tech" },
  { name: "orthopaedic", label: "Orthopaedic" },
  { name: "breathable", label: "Breathable" },
  { name: "doubleSided", label: "Double Sided" },
  { name: "knitte", label: "Knitte" },
  { name: "wool", label: "Wool" },
  { name: "visco", label: "Visco" },
  { name: "dns", label: "DNS" },
  { name: "latex", label: "Latex" },
  { name: "washable", label: "Washable" },
];


const inputClass =
  'text-black placeholder-gray-400 border border-gray-700 focus:ring-0 focus:outline-none';

export default function AdminProductUpdateForm({
  initialData,
}: {
  initialData: z.infer<typeof ProductSchema> & { id: string };
}) {
    const { id, ...formDefaults } = initialData;

    const form = useForm<z.infer<typeof ProductSchema>>({
      resolver: zodResolver(ProductSchema),
      defaultValues: formDefaults, // აქიდან id ამოღებულია
    });

  const productType = form.watch('type');

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    const res = await updateProduct({ ...data, id: initialData.id });
    alert(res.message);
    redirect('/')
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="titleEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>სათაური (EN)</FormLabel>
                <FormControl>
                  <Input placeholder="სათაური ინგლისურად" {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="titleKa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>სათაური (KA)</FormLabel>
                <FormControl>
                  <Input placeholder="სათაური ქართულად" {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>კატეგორია (EN)</FormLabel>
                <FormControl>
                  <select {...field} className={cn(inputClass, 'bg-white text-black')}>
                    <option value="">Select category</option>
                    {categoryOptions.map((option) => (
                      <option key={option.en} value={option.en}>
                        {option.en}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryKa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>კატეგორია (KA)</FormLabel>
                <FormControl>
                  <select {...field} className={cn(inputClass, 'bg-white text-black')}>
                    <option value="">აირჩიე კატეგორია</option>
                    {categoryOptions.map((option) => (
                      <option key={option.ka} value={option.ka}>
                        {option.ka}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondtext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>პატარა ტექსტი (GE)</FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondtextEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>პატარა ინგლისურად (EN)</FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>სურათები</FormLabel>
                <Card>
                  <CardContent className="space-y-2 mt-2 min-h-48">
                    <div className="flex flex-wrap gap-2 items-center">
                      <ImageUpload value={field.value} onChange={field.onChange} />
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>პროდუქტის ტიპი</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="აირჩიე პროდუქტის ტიპი" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black border text-white">
                    <SelectItem value="MATTRESS">მატრასი</SelectItem>
                    <SelectItem value="PILLOW">ბალიში</SelectItem>
                    <SelectItem value="PAD">ტოპერი</SelectItem>
                    <SelectItem value="QUILT">საბანი</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* მოარგე დინამიური ველები კონკრეტულ productType-ზე */}
          {/* იგივე ლოგიკა რაც შენ შექმნის ფორმაში გაქვს */}

          {/* მაგ: */}
          {productType === 'MATTRESS' && (
            <>
                 <FormField
               control={form.control}
               name="height"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel className="text-black">სიმაღლე</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                       <SelectTrigger className={inputClass}>
                         <SelectValue placeholder="აირჩიე სიმაღლე" />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent className="bg-black border border-gray-700 text-white">
                       {heightOptions.map((option) => (
                         <SelectItem key={option.value} value={option.value}>
                           {option.text}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                   <FormMessage />
                 </FormItem>
               )}
             />
              <div className="grid grid-cols-2 gap-2">
             {checkboxOptions.map(({ name, label }) => (
           <Controller
             key={name}
             name={name}
             control={form.control}
             defaultValue={false}
             render={({ field }) => (
               <label className="flex items-center gap-2">
                <Checkbox
           checked={Boolean(field.value)}
           onCheckedChange={(checked) => field.onChange(Boolean(checked))}
         />
                 <span>{label}</span>
               </label>
             )}
           />
         ))}
              </div>
              <div className="flex flex-col gap-y-5">
                <textarea {...form.register('descriptionEn')} placeholder="აღწერა (EN)" className={inputClass} />
                <textarea {...form.register('descriptionKa')} placeholder="აღწერა (KA)" className={inputClass} />
              </div>
            </>
          )}
          {productType === "PILLOW" && (
  <>
    <Input {...form.register("size")} placeholder="ზომა" className={inputClass} />
    <Input type="number" {...form.register("weight", { valueAsNumber: true })} placeholder="წონა" className={inputClass} />
    <Input {...form.register("outerFabric")} placeholder="გარე ქსოვილი (KA)" className={inputClass} />
    <Input {...form.register("outerFabricEn")} placeholder="გარე ქსოვილი (EN)" className={inputClass} />
    <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
    <Input {...form.register("fillingEn")} placeholder="შევსება (EN)" className={inputClass} />
    <Input {...form.register("packaging")} placeholder="შეფუთვა (KA)" className={inputClass} />
    <Input {...form.register("packagingEn")} placeholder="შეფუთვა (EN)" className={inputClass} />
  </>
)}
{productType === "PAD" && (
  <>
    <Input {...form.register("firmness")} placeholder="სიმაგრე (KA)" className={inputClass} />
    <Input {...form.register("firmnessEn")} placeholder="სიმაგრე (EN)" className={inputClass} />
      <FormField
    control={form.control}
    name="height"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-black">სიმაღლე</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="აირჩიე სიმაღლე" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-black border border-gray-700 text-white">
            {heightOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

    <div className="grid grid-cols-2 gap-2">
      {checkboxOptions.map(({ name, label }) => (
    <Controller
      key={name}
      name={name}
      control={form.control}
      defaultValue={false}
      render={({ field }) => (
        <label className="flex items-center gap-2">
         <Checkbox
    checked={Boolean(field.value)}
    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
  />
          <span>{label}</span>
        </label>
      )}
    />
  ))}
    </div>

    <div className="flex flex-col gap-y-5">
      <textarea {...form.register("descriptionEn")} placeholder="აღწერა (EN)" className={inputClass} />
      <textarea {...form.register("descriptionKa")} placeholder="აღწერა (KA)" className={inputClass} />
    </div>
  </>
)}

{productType === "QUILT" && (
  <>
    <Input {...form.register("dimensions")} placeholder="ზომები" className={inputClass} />
    <Input {...form.register("fabric")} placeholder="ქსოვილი (KA)" className={inputClass} />
    <Input {...form.register("fabricEn")} placeholder="ქსოვილი (EN)" className={inputClass} />
    <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
    <Input {...form.register("fillingEn")} placeholder="შევსება (EN)" className={inputClass} />
    <Input type="number" {...form.register("weight", { valueAsNumber: true })} placeholder="წონა" className={inputClass} />

    <div className="flex flex-col gap-y-5">
      <textarea {...form.register("descriptionEn")} placeholder="აღწერა (EN)" className={inputClass} />
      <textarea {...form.register("descriptionKa")} placeholder="აღწერა (KA)" className={inputClass} />
    </div>
  </>
)}


          {/* დანარჩენი productType-ებიც დაამატე იმავე ლოგიკით რაც შენს შექმნის ფორმაში გაქვს */}

          <Button type="submit" className="mx-auto w-[200px] cursor-pointer bg-white text-black hover:bg-white">
            განაახლე პროდუქტი
          </Button>
        </form>
      </Form>
    </div>
  );
}
