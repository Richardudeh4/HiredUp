import { createCompany } from '@/app/actions'
import { countryList } from '@/app/utils/countryList'
import { companySchema } from '@/app/utils/zodSchema'
import { UploadDropzone } from '@/components/general/uploadthing'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CompanyForm = () => {
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            about: "",
            location: "",
            logo: "",
            name: "",
            website: "",
            xAccount: "", 
        }
    });
    const [pending, setPending] = useState<boolean>(false);
    async function onSubmit(data: z.infer<typeof companySchema>){
        try{
        setPending(true);
        await createCompany(data);
        }catch(error){
            if(error instanceof Error && error.message !== "NEXT_REDIRECT"){
                console.log("Something went wrong");
            }
        }finally{
            setPending(false);
        }
    }

  return (
    <Form  {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter company name" {...field}/>
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({field}) => (
                <FormItem>
                <FormLabel>Company Location</FormLabel>
                <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
                >
                <FormControl>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select Location"/>
                    </SelectTrigger>
                </FormControl>
                <SelectContent className=''>
                    <SelectGroup>
                        <SelectLabel>Worldwide</SelectLabel>
                        <SelectItem value='worldwide'>
                            <span>🌍</span>
                            <span>Worldwide / Remote</span>
                        </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>Location</SelectLabel>
                        {countryList.map((country) => (
                            <SelectItem value={country.name} key={country.name}>
                                 <span>{country.flag}</span>
                                 <span className='pl-2 '>{country.name}</span>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
                <FormMessage/> 
                </FormItem>
            )}
            />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <FormField
            control={form.control}
            name="website"
            render={({field}) => (
                <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                    <Input placeholder="https://yourcompany.com" {...field}/>
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="xAccount"
            render={({field}) => (
                <FormItem>
                <FormLabel>X (Twitter) Account</FormLabel>
                <FormControl>
                    <Input placeholder="@yourCompany" {...field}/>
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
            </div>
            <FormField
            control={form.control}
            name="about"
            render={({field}) => (
                <FormItem>  
                <FormLabel>About</FormLabel>
                <FormControl>
                   <Textarea
                   placeholder="Tell us about your company..."
                   {...field }
                   />
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="logo"
            render={({field}) => (
                <FormItem>  
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                 <div>
                    {
                        field.value? (
                            <div className='relative w-fit'>
                            <Image src={field.value} width={400} height={400}  alt="Company logo" className='rounded-lg '/>
                            <Button 
                            type="button"
                            variant="destructive"
                            onClick={() => field.onChange("")}
                            className=' absolute -top-2 -right-2'>
                                <XIcon className='size-5'/>
                            </Button>
                            </div>
                        ): (
                            <UploadDropzone 
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              field.onChange(res[0].url);
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
            <Button type="submit" className='w-full' disabled={pending}>
                {
                pending ? "Submitting..." : "Continue"
                }
            </Button>
        </form>
    </Form>
  )
}

export default CompanyForm