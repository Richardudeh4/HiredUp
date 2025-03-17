
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image';
import * as React from "react";
import zoom from "../../../../public/assets/zoom.svg";
import disney from "../../../../public/assets/disney.svg";
import figma from "../../../../public/assets/figma.svg";
import ibm from "../../../../public/assets/ibm.svg";
import paypal from "../../../../public/assets/paypal.svg";
import spotify from "../../../../public/assets/spotify.svg";
import CreateJobForm from '@/components/forms/createJobForm';
const companies = [
    {id:0, name: 'Zoom', logo:zoom},
    {id:1, name: 'Disney', logo: disney},
    {id:2, name: 'Figma', logo: figma},
    {id:3, name: 'IBM', logo: ibm},
    {id:4, name: 'Paypal', logo: paypal},
    {id:5, name: 'Spotify', logo: spotify},
]

const stats = [
    {id:0, value: "10K+", label: "Monthly active job seeker"},
    {id:1, value: "48h", label: "Average time to hire"},
    {id:2 , value: "95%", label: "Employer satisfaction rate"},
    {id:3 , value: "500+", label: "Companies hiring remotely"},
]
const testimonials = [
    {
      "name": "James Carter",
      "company": "TechNova Solutions",
      "position": "Hiring Manager",
      "testimonial": "We found the perfect software engineer through this platform in just a few days. The process was seamless, and the quality of applicants was outstanding!",
      "rating": 5
    },
    {
      "name": "Sophia Martinez",
      "company": "BrightFuture Marketing",
      "position": "HR Director",
      "testimonial": "This website made our hiring process so much easier! The applicant tracking system is efficient, and we were able to connect with top talent quickly.",
      "rating": 4.8
    },
    {
      "name": "David Johnson",
      "company": "InnovateTech",
      "position": "CEO",
      "testimonial": "We've hired multiple employees through this platform, and every time, we've been impressed with the quality of candidates. Highly recommend!",
      "rating": 5
    },
    {
      "name": "Lisa Chang",
      "company": "GreenPath Consulting",
      "position": "Talent Acquisition Manager",
      "testimonial": "I was amazed by the speed and efficiency of this platform. We hired a fantastic project manager within a week!",
      "rating": 4.7
    },
    {
      "name": "Michael Brown",
      "company": "NextGen AI",
      "position": "CTO",
      "testimonial": "This platform connects us with highly skilled professionals. We've onboarded some of the best AI engineers through this site!",
      "rating": 4.9
    }
  ]
  
export default function page() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>
        <CreateJobForm/>
    {/* <Card className="col-span-1 lg:col-span-2">
    <CardHeader>
        <CardTitle>hey it is richard</CardTitle>
    </CardHeader>
    </Card> */}
    <div className="col-span-1">
    <Card>
        <CardHeader>
            <CardTitle className='text-xl'>Trusted by Industry leaders</CardTitle>
            <CardDescription>
                Join thousands of companies hiring world class talents
            </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
            {/* company logos */}
            <div className='grid grid-cols-3 gap-4'>
                {
                    companies.map((company) => (
                        <div key={company.id}>
                            <Image src={company.logo} width={80} height={80} alt="" className='rounded-lg opacity-75 transition-opacity hover:opacity-100'/>
                        </div>
                    ))
                }
            </div>
            <div className='space-y-4'>
            {testimonials.map((item) => (
                <blockquote key={item.name} className="border-l-2 border-primary pl-4">
                        <p className='italic text-sm text-muted-foreground'>"{item.testimonial}"</p>
                        <footer className='mt-2 text-sm font-medium'>
                            - {item.name}, {item.company}
                        </footer>
                </blockquote>
            ))}
            </div>
            {/* we will render stat here */}
            <div className="grid grid-cols-2 gap-4">
                {stats.map((item) => (
                    <div key={item.id} className='rounded-lg bg-slate-600 p-4'>
                        <h4 className="text-2xl font-bold">{item.value}</h4>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
    </div>
    </div>
  )
}
 