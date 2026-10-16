export interface Session {
  id: string;
  practitioner: string;
  title: string;
  type: string;
  datetime: string;
  location: string;
  rating: number;
  avatar: string;
  price?: string;
  duration?: string;
  description?: string;
  spotsAvailable?: number;
  isFavorited?: boolean;
  tags?: string[];
  media?: MediaItem[];
  reviews?: Review[];
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  alt?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  reviewCount?: number;
  photoCount?: number;
}

export interface Practitioner {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  isFavorited?: boolean;
  location?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  practitioner: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: string;
}

export interface FilterOptions {
  modality: string[];
  date: string[];
  price: string[];
  sessionType: string[];
}

export interface AuthFormData {
  fullName?: string;
  email: string;
  phone?: string;
  zipCode?: string;
  password?: string;
  enableFaceId?: boolean;
  agreeToUpdates?: boolean;
}

export interface VerificationData {
  email: string;
  phone: string;
  emailCode: string;
  phoneCode: string;
}

export interface PlaceholderPageProps {
  title: string;
}

export interface BottomNavigationProps {
  currentPage?: "home" | "upcoming" | "search" | "profile";
}

export interface SessionCardProps {
  session: Session;
  variant?: "default" | "compact" | "detailed";
  showFavorite?: boolean;
  showShare?: boolean;
  onClick?: () => void;
}

export interface CalendarProps {
  events: CalendarEvent[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export interface FilterComponentProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export interface MediaGalleryProps {
  media: MediaItem[];
  autoPlay?: boolean;
  showThumbnails?: boolean;
}

export interface ReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  showAll?: boolean;
}

export interface VerificationCodeProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  length?: number;
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  agreeToUpdates: boolean;
}

// Authentication and User Types
export type UserRole = "user" | "practitioner";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  zipCode?: string;
  avatar?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface AppLayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
}

export interface ProtectedPageProps {
  session: {
    user: SessionUser;
    expires: string;
  };
  user: SessionUser;
}

export interface BackendResponse {
  message: string;
  status: boolean;
  data: {
    email?: string;
    phone?: string;
  };
  fullResponse: unknown;
}
export type StudioDetails = {
  id?: string;
  name: string;
  location: string;
  description: string;
  logoUrl: string;
};
