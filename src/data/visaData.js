const visaData = [
    {
      country: "USA",
      visas: [
        {
          type: "Tourist Visa (B1/B2)",
          requirements: [
            "Valid passport (6+ months)",
            "DS-160 form submission",
            "Visa interview appointment",
            "Proof of financial means",
          ],
          processingTime: "3-6 weeks",
          cost: "$185",
        },
        {
          type: "Work Visa (H-1B)",
          requirements: [
            "Job offer from a US employer",
            "LCA approval from the Department of Labor",
            "Completed I-129 petition",
            "USCIS approval",
          ],
          processingTime: "3-8 months",
          cost: "$460 + employer fees",
        },
      ],
    },
    {
      country: "Canada",
      visas: [
        {
          type: "Visitor Visa",
          requirements: [
            "Valid passport",
            "Proof of ties to home country",
            "Bank statements",
            "Travel history",
          ],
          processingTime: "2-6 weeks",
          cost: "CAD 100",
        },
        {
          type: "Express Entry (PR)",
          requirements: [
            "Language test (IELTS/CELPIP)",
            "Education credential assessment (ECA)",
            "Proof of funds",
            "Express Entry profile submission",
          ],
          processingTime: "6-12 months",
          cost: "CAD 1,325",
        },
      ],
    },
  ];
  
  export default visaData;
  