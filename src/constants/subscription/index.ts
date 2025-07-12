
export const TRIAL_PERIOD_DAYS = 7;

export const AFFILIATE_COMMISSION_PERCENTAGE = 0.1; // 10%

export const Products = {
    basic: "BASIC_PRODUCT_ID",
    professional: "PROFESSIONAL_PRODUCT_ID",
};

export const PlanTypes = {
    free: "free",
    basic: "basic",
    professional: "professional",
} as const;

export const plans = [
    {
        product_id: null,
        type: PlanTypes.free,
        name: "Free",
        description:
            "Free plan, with limited features,ideal for exploring the platform",
        prices: [],
        features: [
            "Search engine optimized",
            "Up to 3 experiences",
            "Up to 3 projects",
            "Up to 3 links",
            "Up to 2 services",
            "Up to 10 skills",
            "Community support",
        ],
    },
    {
        name: "Basic",
        type: PlanTypes.basic,
        product_id: Products.basic,
        description: "",
        popular: true,
        prices: [],
        features: [
            "Free vanity URL",
            "All portfolio templates",
            "Unlimited experiences",
            "Unlimited projects",
            "Unlimited services",
            "Unlimited skills",
            "Unlimited links",
            "Unlimited languages",
        ],
    },
    // {
    //     name: "Professional",
    //     type: PlanTypes.professional,
    //     product_id: Products.professional,
    //     disabled: true,
    //     description: "",
    //     prices: [],
    //     features: [
    //         "All Pro features",
    //         "Team collaboration",
    //         "API access",
    //         "Custom branding",
    //         "Dedicated support",
    //         "SLA guarantee",
    //     ],
    // },
];



export type PlanType = typeof PlanTypes[keyof typeof PlanTypes];