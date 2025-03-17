"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import logo from "../../../../public/assets/logo.png";
import { Card, CardContent } from '@/components/ui/card';
import UserTypeSelection from './user-type-form';
import CompanyForm from './company-form';
import JobSeekerForm from './job-seeker-form';

 export type UserSelectionType = "company" | "jobbseeker" | null  ;
export default function OnBoardingForm() {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState<UserSelectionType>(null);

    function handleUserTypeSelection(type: UserSelectionType){
        setUserType(type);
        setStep(2); 
    }
    function renderStep(){
            switch(step){
                case 1:
                    return <UserTypeSelection onSelect={handleUserTypeSelection}/>;
                case 2:
                    return userType === "company" ? (
                        <CompanyForm/>
                    ): (
                        <JobSeekerForm/>
                    );
                default:
                    return null;
            }
    }
  return (
    <>
       <div className='flex items-center gap-4 mb-10 '>
        <Image src={logo} width={50} height={50} alt="logo"/>
        <h1 className='font-bold text-4xl'>Hired<span className='text-yellow-400'>Up</span></h1>
       </div>
       <Card className='max-w-lg w-full '>
        <CardContent className=' p-6'>
            {renderStep()}
        </CardContent>
       </Card>
    </>
  )
}
