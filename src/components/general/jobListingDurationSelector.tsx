import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ControllerRenderProps } from 'react-hook-form';
import { jobListingDurationPricing } from '@/app/utils/jobListingDurationSelector';
import { Label } from '../ui/label';
import { Card } from '../ui/card';

interface iAppProps{
    field: ControllerRenderProps;
}

export default function JobListingDuration({ field}:iAppProps) {
  return (
    <RadioGroup 
    value={field.value?.toString()}
    onValueChange={(value) => field.onChange(parseInt(value))}
    >
         <div className='grid gap-4'>
        {
         jobListingDurationPricing.map((duration) => (
                <div key={duration.days} className='relative'>
                    <RadioGroupItem 
                    value={duration.days.toString()}
                    id={duration.days.toString()}
                    className='peer sr-only'
                    />
                    <Label className="flex flex-col cursor-pointer">
                        <Card  
                        className={`p-4 border-2 transition-all ${
                    field.value === duration.days
                      ? "border-primary bg-primary/10"
                      : "hover:bg-secondary/50"
                  }`}>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='font-semibold text-lg'>{duration.days} Days</p>
                                    <p className='font-muted-foreground text-sm'>{duration.description} </p>
                                </div>
                                <div className="text-right">
                                <p className='font-bold text-xl'>${duration.price}</p>
                                <p className='text-sm text-muted-foreground'>${(duration.price / duration.days).toFixed(2)}/day</p>
                                </div>
                            </div>
                        </Card>
                    </Label>
                </div>
            ))
        }
        </div>
    </RadioGroup>
  )
}
