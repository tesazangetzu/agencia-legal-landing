export type IconName =
  | "building"
  | "file-text"
  | "users"
  | "shield"
  | "home"
  | "map-pin"
  | "phone"
  | "mail"
  | "message"
  | "clock"
  | "arrow-right"
  | "plus";

export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  image: string;
  imageAlt: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
  context: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
