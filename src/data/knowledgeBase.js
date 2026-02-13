export const RAM_EESH_KNOWLEDGE_BASE = {
    institution: {
        name: "Ram-Eesh Group of Institutions",
        location: "Greater Noida, Uttar Pradesh, India",
        type: "Private Educational Institution",
        affiliations: [
            "AICTE (Technical Education)",
            "PCI (Pharmacy Council)",
            "BTE UP (Board of Technical Education)",
            "AKTU (Dr. A.P.J. Abdul Kalam Technical University)"
        ],
        overview: "Premier group focused on Pharmacy, Engineering, and Management. Known for practical skills and industrial exposure."
    },

    colleges: [
        {
            id: "rivte",
            name: "Ram-Eesh Institute of Vocational & Technical Education (RIVTE)",
            focus: "Pharmacy (Flagship)",
            programs: [
                { name: "D.Pharm", duration: "2 Years", eligibility: "10+2 (PCB/PCM)", intake: 60 },
                { name: "B.Pharm", duration: "4 Years", eligibility: "10+2 (50% PCB/PCM)", intake: 100 },
                { name: "M.Pharm (Pharmaceutics/Pharmacology)", duration: "2 Years", eligibility: "B.Pharm (55%)", intake: 15 }
            ],
            features: ["Modern Labs", "Animal House", "Herbal Garden", "Machine Room"]
        },
        {
            id: "riet",
            name: "Ram-Eesh Institute of Engineering & Technology (RIET)",
            focus: "Engineering",
            programs: [
                { name: "Diploma CSE", duration: "3 Years", eligibility: "10th Pass (Science/Maths)", intake: 60 },
                { name: "Diploma Electronics", duration: "3 Years", eligibility: "10th Pass", intake: 60 },
                { name: "Diploma Civil", duration: "3 Years", eligibility: "10th Pass", intake: 60 }
            ],
            features: ["Advanced Computer Labs", "Workshops", "Project Based Learning"]
        }
    ],

    admissions: {
        process: "Online Application -> Entrance/Merit -> Counseling -> Document Verification -> Fee Submission",
        documents: ["10th/12th Marksheets", "TC", "Migration", "Aadhar", "Photos", "Domicile"],
        contact: { phone: "+91-120-2322657", mobile: "9810142854", email: "admissions@rameesh.org" }
    },

    campus: {
        highlights: [
            "Green Campus in Knowledge Park", "Smart Classrooms", "20,000+ Books Library",
            "Separate Hostels (Boys/Girls) with Mess", "Sports Complex", "24x7 Security & Wi-Fi", "Transport (Delhi-NCR)"
        ]
    },

    placements: {
        record: "strong in Pharmacy sector",
        recruiters: ["Cipla", "Sun Pharma", "Ranbaxy", "Apollo Hospitals", "Fortis", "TCS", "Wipro"],
        support: "Soft Skills & Mock Interviews provided."
    },

    events: {
        annual: ["'Umang' (Cultural Fest)", "'Tech-Spardha' (Technical Symposium)", "Annual Sports Meet"]
    }
};

export const AGENT_SYSTEM_PROMPTS = {
    Master: `You are Ram-Eesh AI. 
    ROLE: Expert Admission & Academic Counselor.
    TONE: Professional, Helpful, Concise.
    INSTRUCTION: Answer using the Knowledge Base. 
    - For ADMISSIONS: Mention eligibility & deadlines.
    - For PLACEMENTS: Mention top recruiters.
    - If asked in HINDI, reply in HINDI.
    - Be FAST and DIRECT.`
};
