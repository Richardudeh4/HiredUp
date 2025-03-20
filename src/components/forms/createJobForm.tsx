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
import { BenefitsSelector } from '../general/BenefitsSelector';
import { Textarea } from '../ui/textarea';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { UploadDropzone } from '../general/uploadthing';

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
                      <JobDescriptionEditor field={field as any}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}

                />
                <FormField
                control={form.control}
                name="benefits"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Benefits
                    </FormLabel>
                    <FormControl>
                    <BenefitsSelector field={field as any}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  <FormField
                  control={form.control}
                  name="companyName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Company name</FormLabel>
                      <FormControl>
                        <Input placeholder='company name...' {...field}/>
                      </FormControl>
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="companyLocation"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='mt-3'>Company Location</FormLabel>
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyWebsite"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='mt-3'>Company website</FormLabel>
                      <FormControl>
                        <Input placeholder='company website' {...field}/>
                      </FormControl>
                    </FormItem>
                  )}
                  />
                <FormField
                  control={form.control}
                  name="companyXAccount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='mt-3'>Company XAccount</FormLabel>
                      <FormControl>
                        <Input placeholder='company X Account' {...field}/>
                      </FormControl>
                    </FormItem>
                  )} 
                  />
                </div>
                <FormField
                  control={form.control}
                  name="companyAbout"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className='mt-3'>Company Description</FormLabel>
                      <FormControl>
                         <Textarea
                         placeholder='Say something about your company'
                         {...field}
                         className='min-h-[120px]'
                         />
                      </FormControl>
                    </FormItem>
                  )} 
                  />
                   <FormField
            control={form.control}
            name="companyLogo"
            render={({field}) => (
                <FormItem>  
                <FormLabel className="mt-3">Company Logo</FormLabel>
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
              </CardContent>
            </Card>
        </form>
    </Form>
  )
}
  