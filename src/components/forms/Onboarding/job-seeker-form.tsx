import { createJobSeeker } from '@/app/actions'
import { jobSeekerSchema } from '@/app/utils/zodSchema'
import { UploadDropzone } from '@/components/general/uploadthing'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import PDFImage from "../../../../public/assets/pdf.png";
import { XIcon } from 'lucide-react'

import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function JobSeekerForm() {
    
    const [pending, setPending] = useState(false);
    async function onSubmit(data: z.infer<typeof jobSeekerSchema>){
        try{
        setPending(true);
        await createJobSeeker(data);
        }catch(error){ 
            if(error instanceof Error && error.message !== "NEXT_REDIRECT"){
                console.log("Something went wrong");
            }
        }finally{
            setPending(false);
        }
    }

    const form = useForm<z.infer<typeof jobSeekerSchema>>({
        resolver: zodResolver(jobSeekerSchema),
        defaultValues: {
            about: "",
            name: "",
            resume: "",
        }
    })
  return (
    <Form {...form}>
       <form className='flex flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)}>
       <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <FormItem>
                <FormLabel>FullName</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your fullname" {...field}/>
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
       <FormField
            control={form.control}
            name="about"
            render={({field}) => (
                <FormItem>
                <FormLabel>About </FormLabel>
                <FormControl>
                  <Textarea placeholder='Tell us about yourself' {...field}/>
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="resume"
            render={({field}) => (
                <FormItem>  
                <FormLabel>Resume (PDF)</FormLabel>
                <FormControl>
                 <div>
                    {
                        field.value? (
                            <div className='relative w-fit'>
                        <Image
                        src={PDFImage}
                        alt="Company Logo"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                            <Button 
                            type="button"
                            variant="destructive"
                            onClick={() => field.onChange("")}
                            className=' absolute -top-2 -right-2'>
                                <XIcon className='size-4'/>
                            </Button>
                            </div>
                        ): (
                            <UploadDropzone
                            endpoint="resumeUploader"
                            onClientUploadComplete={(res) => {
                              field.onChange(res[0].url);
                              toast.success("Resume uploaded successfully!");

                            }}
                            onUploadError={() => {
                              console.log("Something went wrong")
                            }}
                            className='ut-button:bg-blue-700 ut-button:w-24  ut-button:text-white ut-button:hover:bg-blue-700/90 
                            ut-label:text-muted-foreground border-primary '
                            />
                        )
                    }
                 </div>
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
            <Button type="submit" className="w-full ">
                {pending ? "Submitting...." : "Continue"}
            </Button>
       </form>
    </Form>
  )
} 
