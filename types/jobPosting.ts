export interface JobPosting {
  id: string;
  title: string;
  department?: string;
  location: string;
  employmentType: string;
  category: string;
  description: string;
  postedDate: string;
  requirements?: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  type: "Full-time" | "Part-time" | "Contract";
}
