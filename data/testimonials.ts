export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    location: "Washington D.C.",
    text: "Jing Tong made my visa application completely seamless. They reviewed every document, caught an error I would have missed, and kept me updated throughout. Got my tourist visa approved in just 5 business days!",
    rating: 5,
  },
  {
    id: "2",
    name: "James T.",
    location: "Northern Virginia",
    text: "Excellent service! Being close to the Chinese Consulate really matters — they know exactly what documents are required and how to prepare them. My application went through without a single issue.",
    rating: 5,
  },
  {
    id: "3",
    name: "Linda K.",
    location: "Maryland",
    text: "Professional, fast, and incredibly knowledgeable. As a first-time China traveler, I had no idea where to start. Jing Tong walked me through everything patiently. Highly recommend!",
    rating: 5,
  },
];
