interface iAppProps{
    days:number;
    price:number;
    description: string;
}

export const jobListingDurationPricing: iAppProps[]= [
    {
        days: 30,
        price: 99,
        description: "Standard listing",
    },
    {
        days: 60,
        price: 120,
        description: "Extended Visiblity",
    },
    {
        days: 90,
        price: 180,
        description: "Maximum Exposure",
    },
]