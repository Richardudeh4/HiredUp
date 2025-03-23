/* eslint-disable */
"use client";
import React, { useState } from 'react'
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
import JobListingDuration from '../general/jobListingDurationSelector';
import { createJob } from '@/app/actions';
import { toast } from 'sonner';

interface CreateJobFormProps {
  companyName: string;
  companyLocation: string;
  companyAbout: string;
  companyLogo: string;
  companyXAccount: string | null;
  companyWebsite: string;
}

export function CreateJobForm({
  companyAbout,
  companyLocation,
  companyLogo,
  companyXAccount,
  companyName,
  companyWebsite,
}: CreateJobFormProps) {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: [],
      companyAbout: companyAbout,
      companyLocation: companyLocation,
      companyName: companyName,
      companyWebsite: companyWebsite,
      companyXAccount: companyXAccount || "",
      employmentType: "",
      jobDescription: "",
      jobTitle: "",
      location: "",
      salaryFrom: 0,
      salaryTo: 0,
      companyLogo: companyLogo,
      listingDuration: 30,
    },
  });

  const [pending, setPending] = useState(false);
  async function onSubmit(values: z.infer<typeof jobSchema>) {
    try {
      setPending(true);
      await createJob(values);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-1   lg:col-span-2  flex flex-col gap-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employment Type</SelectLabel>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Worldwide</SelectLabel>
                          <SelectItem value="worldwide">
                            <span>🌍</span>
                            <span className="pl-2">Worldwide / Remote</span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem value={country.name} key={country.code}>
                              <span>{country.flag}</span>
                              <span className="pl-2">{country.name}</span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                <SalaryRangeSelector minSalary={10000} control={form.control} maxSalary={1000000} currency="USD" step={2000}/>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.salaryFrom?.message ||
                    form.formState.errors.salaryTo?.message}
                </FormMessage>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitsSelector field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Worldwide</SelectLabel>
                          <SelectItem value="worldwide">
                            <span>🌍</span>
                            <span className="pl-2">Worldwide</span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem value={country.name} key={country.name}>
                              <span>{country.flag}</span>
                              <span className="pl-2">{country.name}</span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <div className="flex ">
                        <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                          https://
                        </span>
                        <Input
                          {...field}
                          placeholder="Company Website"
                          className="rounded-l-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyXAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company X Account</FormLabel>
                    <FormControl>
                      <div className="flex ">
                        <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                          @
                        </span>
                        <Input
                          {...field}
                          placeholder="Company X Account"
                          className="rounded-l-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="companyAbout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Company Description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <Image
                            src={field.value}
                            alt="Company Logo"
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 "
                            onClick={() => field.onChange("")}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                            toast.success("Logo uploaded successfully!");
                          }}
                          onUploadError={() => {
                            toast.error(
                              "Something went wrong. Please try again."
                            );
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Listing Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="listingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <JobListingDuration field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Button type="submit" className="w-full" disabled={pending}>
                 {pending ? "Submitting.." : "Create Job Post"}
            </Button>
      </form>
    </Form>
  );
}

// /* eslint-disable */
// "use client";
// import React, { useState } from 'react'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { jobSchema } from '@/app/utils/zodSchema'
// import { z } from 'zod'
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
// import { Input } from '../ui/input';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '../ui/select';
// import { countryList } from '@/app/utils/countryList';
// import SalaryRangeSelector from '../general/SalaryRangeSelector';
// import JobDescriptionEditor from '../richTextEditor/jobDescriptionEditor';
// import { BenefitsSelector } from '../general/BenefitsSelector';
// import { Textarea } from '../ui/textarea';
// import { XIcon } from 'lucide-react';
// import Image from 'next/image';
// import { Button } from '../ui/button';
// import { UploadDropzone } from '../general/uploadthing';
// import JobListingDuration from '../general/jobListingDurationSelector';
// import { createJob } from '@/app/actions';

// interface iAppProps{
//   companyAbout: string;
//   companyLocation: string;
//   companyLogo: string;
//   companyName: string;
//   companyWebsite: string;
//   companyXAccount: string | null;
// }

// const  CreateJobForm = ({
//   companyAbout,
//   companyLocation,
//   companyLogo,
//    companyName, 
//    companyWebsite,
//    companyXAccount
//   }
//    :iAppProps) => {
//   const form = useForm<z.infer<typeof jobSchema>>({
//     resolver: zodResolver(jobSchema),
//     defaultValues: {
//       benefits: [],
//       companyAbout: companyAbout,
//       companyLocation: companyLocation,
//       companyName: companyName,
//       companyLogo: companyLogo,
//       companyWebsite: companyWebsite,
//       companyXAccount: companyXAccount || "",
//       employmentType: "",
//       jobDescription: "",
//       jobTitle: "",
//       listingDuration: 30,
//       location: "",
//       salaryFrom: 0,
//       salaryTo: 0, 
//     }
//   });
//   const [pending, setPending] = useState(false);
// async function onSubmit(values: z.infer<typeof jobSchema>){
//   try{
//     setPending(true); 
//     await createJob(values);
//   }catch(error){
// if(error instanceof Error && error.message !== "NEXT_REDIRECT"){
//   console.log("Something went wrong", error);
//   }
// }
// finally{
//   setPending(false);
// }
//   return (
//     <Form {...form}>
//         <form className='col-span-1 lg:col-span-2 flex flex-col gap-8' onSubmit={form.handleSubmit(onSubmit)}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Job Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                     control={form.control}
//                     name="jobTitle"
//                     render={({field}) => (
//                       <FormItem>
//                         <FormLabel>Job Title</FormLabel>
//                         <FormControl>
//                           <Input placeholder='Job title' {...field}/>
//                         </FormControl>
//                         <FormMessage/>
//                       </FormItem>
//                     )}
//                     /> 
//                     <FormField
//                     control={form.control}
//                     name="employmentType"
//                     render={({field}) => (
//                       <FormItem>
//                         <FormLabel>Employment Type</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger className='w-full'>
//                               <SelectValue placeholder="Select Employment type "/>
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className='bg-black text-white dark:bg-white dark:text-black'>
//                             <SelectGroup>
//                               <SelectLabel className='capitalize'>Employment Type</SelectLabel>
//                               <SelectItem value="full-time">Full Time</SelectItem>
//                               <SelectItem value="part-time">Part Time</SelectItem>
//                               <SelectItem value="contract">Contract</SelectItem>
//                               <SelectItem value="internship">Internship</SelectItem>
//                             </SelectGroup>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage/>
//                       </FormItem>
//                     )}
//                     /> 
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField
//                     control={form.control}
//                     name="location"
//                     render={({field}) => (
//                       <FormItem>
//                         <FormLabel className='mt-3'>Job Location</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger className='w-full'>
//                               <SelectValue placeholder="Select location"/>
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className='bg-black text-white dark:bg-white dark:text-black'>
//                             <SelectGroup>
//                               <SelectLabel className='capitalize'>Worldwide</SelectLabel>
                              
//                               <SelectItem value="worldwide">
//                                 <span>🌍</span>
//                                 <span className='pl-2'>Worldwide / Remote</span>
//                                 </SelectItem>
//                                 <SelectSeparator/>
//                             </SelectGroup>
//                             <SelectGroup>
//                               <SelectLabel>Location</SelectLabel>
//                               {
//                                 countryList.map((country) => (
//                                   <SelectItem key={country.code} value={country.name}>
//                                     <span>{country.flag}</span>
//                                     <span className="pl-2">{country.name}</span>

//                                   </SelectItem>
//                                 ))
//                               }
//                             </SelectGroup>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage/>
//                       </FormItem>
//                     )}
//                     />
//                     <FormItem>
//                      <FormLabel className="mt-3">Salary Range</FormLabel>
//                      <FormControl>
//                       <SalaryRangeSelector minSalary={10000} control={form.control} maxSalary={1000000} currency="USD" step={2000}/>
//                      </FormControl>
//                     </FormItem>
//                 </div>
//                 <FormField
//                 control={form.control}
//                 name="jobDescription"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel className='mt-3'>Job Description</FormLabel>
//                     <FormControl>
//                       <JobDescriptionEditor field={field as any}/>
//                     </FormControl>
//                     <FormMessage/>
//                   </FormItem>
//                 )}

//                 />
//                 <FormField
//                 control={form.control}
//                 name="benefits"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>
//                       Benefits
//                     </FormLabel>
//                     <FormControl>
//                     <BenefitsSelector field={field as any}/>
//                     </FormControl>
//                     <FormMessage/>
//                   </FormItem>
//                 )}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Company Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
//                   <FormField
//                   control={form.control}
//                   name="companyName"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel>Company name</FormLabel>
//                       <FormControl>
//                         <Input placeholder='company name...' {...field}/>
//                       </FormControl>
//                       <FormMessage/>
//                     </FormItem>
//                   )}
//                   />
//                   <FormField
//                   control={form.control}
//                   name="companyLocation"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel className='mt-3'>Company Location</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger className='w-full'>
//                             <SelectValue placeholder="Select location"/>
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent className='bg-black text-white dark:bg-white dark:text-black'>
//                           <SelectGroup>
//                             <SelectLabel className='capitalize'>Worldwide</SelectLabel>
                            
//                             <SelectItem value="worldwide">
//                               <span>🌍</span>
//                               <span className='pl-2'>Worldwide / Remote</span>
//                               </SelectItem>
//                               <SelectSeparator/>
//                           </SelectGroup>
//                           <SelectGroup>
//                             <SelectLabel>Location</SelectLabel>
//                             {
//                               countryList.map((country) => (
//                                 <SelectItem key={country.code} value={country.name}>
//                                   <span>{country.flag}</span>
//                                   <span className="pl-2">{country.name}</span>

//                                 </SelectItem>
//                               ))
//                             }
//                           </SelectGroup>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage/>
//                     </FormItem>
//                   )}
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField
//                   control={form.control}
//                   name="companyWebsite"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel className='mt-3'>Company website</FormLabel>
//                       <FormControl>
//                         <Input placeholder='company website' {...field}/>
//                       </FormControl>
//                       <FormMessage/>
//                     </FormItem>
//                   )}
//                   />
//                 <FormField
//                   control={form.control}
//                   name="companyXAccount"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel className='mt-3'>Company XAccount</FormLabel>
//                       <FormControl>
//                         <Input placeholder='company X Account' {...field}/>
//                       </FormControl>
//                       <FormMessage/>
//                     </FormItem>
//                   )} 
//                   />
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="companyAbout"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel className='mt-3'>Company Description</FormLabel>
//                       <FormControl>
//                          <Textarea
//                          placeholder='Say something about your company'
//                          {...field}
//                          className='min-h-[120px]'
//                          />
//                       </FormControl>
//                     </FormItem>
//                   )} 
//                   />
//                    <FormField
//             control={form.control}
//             name="companyLogo"
//             render={({field}) => (
//                 <FormItem>  
//                 <FormLabel className="mt-3">Company Logo</FormLabel>
//                 <FormControl>
//                  <div>
//                     {
//                         field.value? (
//                             <div className='relative w-fit'>
//                             <Image src={field.value} width={400} height={400}  alt="Company logo" className='rounded-lg '/>
//                             <Button 
//                             type="button"
//                             variant="destructive"
//                             onClick={() => field.onChange("")}
//                             className=' absolute -top-2 -right-2'>
//                                 <XIcon className='size-5'/>
//                             </Button>
//                             </div>
//                         ): (
//                             <UploadDropzone 
//                             endpoint="imageUploader"
//                             onClientUploadComplete={(res) => {
//                               field.onChange(res[0].url);
//                             }}
//                             onUploadError={() => {
//                               console.log("Something went wrong")
//                             }}
//                             className='ut-button:bg-blue-700 ut-button:w-24  ut-button:text-white ut-button:hover:bg-blue-700/90 
//                             ut-label:text-muted-foreground border-primary '
//                             />
//                         )
//                     }
//                  </div>
//                 </FormControl>
//                 <FormMessage/> 
//                 </FormItem>
//             )}
//             />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Job Listing Duration</CardTitle>
//                 </CardHeader>
//               <CardContent>
//                 <FormField
//                 control={form.control}
//                 name="listingDuration"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormControl>
//                       <JobListingDuration field={field as any}/>
//                     </FormControl>
//                     <FormMessage/>
//                   </FormItem>
//                 )}
//                 />
//               </CardContent>
//             </Card>
//             <Button type="submit" className="w-full" disabled={pending}>
//                   {pending ? "Submitting.." : "Create Job Post"}
//             </Button>
//         </form>
//     </Form>
//   ) 
// }
// }
// export default CreateJobForm;