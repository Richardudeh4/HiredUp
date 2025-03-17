"use server";

import { z } from "zod";

import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { companySchema, jobSeekerSchema } from "./utils/zodSchema";
import { requireUser } from "./utils/requireUser";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";

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