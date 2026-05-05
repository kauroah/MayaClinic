// Service types
export interface Service {
  id: string
  slug: string
  name: string
  description: string
  fullDescription: string
  price?: string
  priceNote?: string
  icon: string
  benefits: string[]
  duration?: string
  category: string
  image?: string

  subServices?: SubService[] 
  externalBooking?: boolean
  externalUrl?: string
  externalSiteName?: string
}

export interface SubService {
  id: string
  name: string
  price: string
  group?: string // 🔥 important for UI grouping
}
// Doctor types
export interface Doctor {
  id: string
  slug: string
  name: string
  title: string
  specialty: string
  bio: string
  fullBio: string
  credentials: string[]
  education: string[]
  experience: string
  rating: number
  reviewCount: number
  image: string
  languages: string[]
  availableDays: string[]
  skills?: string[]
  video?: string
}

export interface StaffMember {
  id: string
  name: string
  position: string
  image: string
  department: "medical" | "administration"
}

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  date: string
  service?: string
  doctorName?: string
  image?: string
  verified: boolean
}

// Blog post types
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole?: string
  date: string
  image: string
  category: string
  readTime: string
  tags: string[]
}

// Promotion types
export interface Promotion {
  id: string
  slug: string
  title: string
  description: string
  fullDescription: string
  terms: string[]
  validFrom: string
  validUntil: string
  discount?: string
  image: string
  category: string
  isActive: boolean
}

// FAQ types
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// License types
export interface License {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  licenseNumber?: string
  description?: string
}

// Document types
export interface ClinicDocument {
  id: string
  name: string
  description: string
  fileUrl: string
  category: string
  fileSize?: string
  fileType: string
}

// Clinic info types
export interface ClinicInfo {
  name: string
  tagline: string
  address: string
  city: string
  phone: string
  email: string
  hours: {
    weekdays: string
    sunday: string
  }
socialLinks: {
  vk?: string;
  telegram?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  line?: string;
  prodoctorov?: string;
  napopravku?: string;
};
  mapEmbedUrl: string
  coordinates: {
    lat: number
    lng: number
  }
}

// Appointment form types
export interface AppointmentFormData {
  name: string
  phone: string
  email: string
  message?: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
