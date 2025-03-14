import { countryList } from '@/app/utils/countryList'
import { companySchema } from '@/app/utils/zodSchema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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
    })
  return (
    <Form  {...form}>
        <form className='space-y-6'>
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
                <SelectContent className='bg-black '>
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
                                 <span className='pl-2'>{country.name}</span>
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
                    <Input placeholder="@yourCompany" {...field}/>
                </FormControl>
                <FormMessage/> 
                </FormItem>
            )}
            />
        </form>
    </Form>
  )
}

export default CompanyForm