/* eslint-disable */
"use client";
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jobSchema } from '@/app/utils/zodSchema'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '../ui/select';
import { countryList } from '@/app/utils/countryList';
import SalaryRangeSelector from '../general/SalaryRangeSelector';
import JobDescriptionEditor from '../richTextEditor/jobDescriptionEditor';

export default function CreateJobForm() {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: [],
      companyAbout: "",
      companyLocation: "",
      companyName: "",
      companyLogo: "",
      companyWebsite: "",
      companyXAccount: "",
      employmentType: "",
      jobDescription: "",
      jobTitle: "",
      listingDuration: 30,
      location: "",
      salaryFrom: 0,
      salaryTo: 0, 
    }
  })
  return (
    <Form {...form}>
        <form className='col-span-1 lg:col-span-2 flex flex-col gap-8'>
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder='Job title' {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    /> 
                    <FormField
                    control={form.control}
                    name="employmentType"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder="Select Employment type "/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-black text-white dark:bg-white dark:text-black'>
                            <SelectGroup>
                              <SelectLabel className='capitalize'>Employment Type</SelectLabel>
                              <SelectItem value="full-time">Full Time</SelectItem>
                              <SelectItem value="part-time">Part Time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="internship">Internship</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                    /> 
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className='mt-3'>Job Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder="Select location"/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-black text-white dark:bg-white dark:text-black'>
                            <SelectGroup>
                              <SelectLabel className='capitalize'>Worldwide</SelectLabel>
                              
                              <SelectItem value="worldwide">
                                <span>🌍</span>
                                <span className='pl-2'>Worldwide / Remote</span>
                                </SelectItem>
                                <SelectSeparator/>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Location</SelectLabel>
                              {
                                countryList.map((country) => (
                                  <SelectItem key={country.code} value={country.name}>
                                    <span>{country.flag}</span>
                                    <span className="pl-2">{country.name}</span>

                                  </SelectItem>
                                ))
                              }
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                    <FormItem>
                     <FormLabel className="mt-3">Salary Range</FormLabel>
                     <FormControl>
                      <SalaryRangeSelector minSalary={10000} control={form.control} maxSalary={1000000} currency="USD" step={2000}/>
                     </FormControl>
                    </FormItem>
                </div>
                <FormField
                control={form.control}
                name="jobDescription"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='mt-3'>Job Description</FormLabel>
                    <FormControl>
                      <JobDescriptionEditor/>
                    </FormControl>
                  </FormItem>
                )}
                />
              </CardContent>
            </Card>
        </form>
    </Form>
  )
}
 