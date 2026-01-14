
export interface FIRData {
  firNumber: string;
  date: string;
  complainantName: string;
  accusedName: string;
  incidentLocation: string;
  description: string;
  ipcSections: {
    section: string;
    description: string;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  DIGITIZER = 'digitizer',
  CHATBOT = 'chatbot'
}
