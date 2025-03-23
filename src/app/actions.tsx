/* eslint-disable */
"use server";

import { z } from "zod";

import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchema";
import { requireUser } from "./utils/requireUser";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
// import { stripe } from "./utils/stripe";

const aj = arcjet.withRule(
  shield({
    mode: "LIVE",
    
  })
).withRule(
  detectBot({
    mode: "LIVE",
    allow: [],
  })
)

export async function createCompany(data: z.infer<typeof companySchema>) {
    
  const user = await requireUser();
  const req = await request();
  const decision = await aj.protect(req);

  if(decision.isDenied()){
    throw new Error("Forbidden");
  }
  // Server-side validation
  const validatedData = companySchema.parse(data);

  console.log(validatedData);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validatedData,
        },
      },
    },
  });

  return redirect("/");
}


 export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>){
    const user = await requireUser();

    const req = await request();
    const decision = await aj.protect(req);
  
    if(decision.isDenied()){
      throw new Error("Forbidden");
    } 
    const validateData = jobSeekerSchema.parse(data);

    await prisma.user.update({
      where: {
        id: user.id as string,
      },
      data:{
        onboardingCompleted: true,
        userType: "JOB_SEEKER",
        JobSeeker: {
          create: {
              ...validateData,

          },
        },
      },
    });
    return redirect("/");
 }
 
export async function createJob(data: z.infer<typeof jobSchema>){
  const user = await requireUser(); 
  //@ts-ignore
  const req = await request();

  const decision = await aj.protect(req);

  if(decision.isDenied()){
    throw new Error("Forbidden");
  }

const validateDate = jobSchema.parse(data);
const company = await prisma.company.findUnique({
    where: {
    userId: user.id,
  },
  select:{
    id:true,
    user:{
      select:{
         stripeCustomerId:true,
      }
    }
  }
})
if(!company?.id){
  return redirect("/");
}
// let stripeCustomerId = company.user.stripeCustomerId;

// if(!stripeCustomerId){
//   const customer = await stripe.customers.create({
//     email:user.email as string,
//     name: user.name as string,
//   });
//   stripeCustomerId = customer.id;
// }
 await prisma.jobPost.create({
  data:{
    jobDescription: validateDate.jobDescription,
    jobTitle: validateDate.jobTitle,
    employmentType: validateDate.employmentType,
    location: validateDate.location,
    salaryFrom: validateDate.salaryFrom,
    salaryTo: validateDate.salaryTo,
    listingDuration: validateDate.listingDuration,
    benefits: validateDate.benefits,
    companyId: company.id,
  },
});
return redirect("/");

}

// "use server";

// import { z } from "zod";
// import { requireUser } from "./utils/requireUser";
// import { companySchema } from "./utils/zodSchema";
// import { prisma } from "./utils/db";
// import { redirect } from "next/navigation";

// export async function createCompany(data: z.infer<typeof companySchema>){
//     const session = await requireUser();
//     const validateData = companySchema.parse(data);
//     await prisma.user.update({
//         where: {
//             id: session.id,
//         },
//         data: {
//             onboardingCompleted: true,
//             userType: "COMPANY",
//             Company: {
//                 create: {
//                      ...validateData,
//                 },
//             },
//         }, 

//     });
    
//     return redirect("/"); 
// } 