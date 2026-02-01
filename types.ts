
export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  size: 'small' | 'medium' | 'large' | 'tall';
  hasAccent?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
  image?: {
    data: string; // base64 string
    mimeType: string;
  };
}
