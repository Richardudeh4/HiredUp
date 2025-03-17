/* eslint-disable */
import React, { useState } from 'react'
import { Slider } from '../ui/slider'
import { Control, useController } from 'react-hook-form'
import { formatCurrency } from '@/app/utils/formatCurrency';

interface iAppProps{
    control: Control<any>;
    minSalary: number;
    maxSalary: number;
    step:number;
    currency: string;
};

export default function SalaryRangeSelector({control, minSalary, maxSalary, step, currency}: iAppProps) {
    const {field:formField} = useController({
         name:"salaryForm",
         control
    })
    const {field: toField} = useController({
        name: "salaryTo",
        control
    })

    const [range, setRange] = useState<[number, number]>([
        formField.value || minSalary,
        toField.value || maxSalary/2,
    ])
    function handleChangeRange(value:number[]){
        const newRange :[number, number] = [value[0], value[1]]
        setRange(newRange);
        formField.onChange(newRange[0])
        toField.onChange(newRange[1]);
    }
  return (
    <div className="w-full space-y-4">
       <Slider
       onValueChange={handleChangeRange}
       min={minSalary}
       max={maxSalary}
       step={step}
       value={range}
       />
       <div className="flex justify-between">
            <span>{formatCurrency(range[0])}</span>
            <span>{formatCurrency(range[1])}</span>
       </div>
    </div>
  )
}
