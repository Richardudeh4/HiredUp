import { Button } from '@/components/ui/button'
import { Building2, PersonStanding, UserRound } from 'lucide-react'
import React from 'react'
import { UserSelectionType } from './onBoardingForm'


interface UserTypeSelectionProps{
  onSelect: (type:UserSelectionType) => void;
}

export default function UserTypeSelection({onSelect}: UserTypeSelectionProps) {
  return (
    <div className='space-y-8'>
       <div className='text-center space-y-2 '>
            <h1 className='text-2xl font-bold '>Welcome! Let's get started</h1>
            <p className='text-muted-foreground'>Choose how you would like use our platform</p>
       </div>
       <div className='grid gap-6'>
            <Button 
            onClick={() => onSelect("company")}
            variant="outline" className='w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5'>
                <div className='size-12 rounded-full bg-yellow-300/10 flex items-center justify-center'>
                <Building2/>
                </div>
                <div className='text-left'>
                <h3 className='font-semibold text-lg'>Company/organization</h3>
                <p>Post Jobs and Find Exceptional Talent</p>
                </div>
            </Button>
            <Button 
           onClick={() => onSelect("jobbseeker")}
            variant="outline" className=' w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5'>
                <div className='size-12 rounded-full bg-yellow-300/10 flex items-center justify-center'>
                <UserRound/>
                </div>
                <div className='text-left'>
                <h3 className='font-semibold text-lg'>Jobseeker</h3>
                <p>Get to land your dream job here</p>
                </div>
            </Button>
       </div>
    </div>
  )
}
