export interface PolaroidCard {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface TimelineNode {
  id: string;
  days: string;
  city: string;
  photos: string[];
}

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BookingForm {
  name: string;
  phone: string;
  comment: string;
}

export interface BookingRequest extends BookingForm {
  id: string;
  createdAt: string;
}
