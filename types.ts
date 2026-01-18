
export enum ActivityType {
  DATA_ACCESS_COMMITTEE = 'Data Access Committee',
  PUBLIC_ADVISORY_MEETING = 'Public Advisory Meeting',
  FOCUS_GROUP = 'Focus Group',
  DELIBERATION = 'Deliberation',
  TOWNHALL = 'Townhall',
  CONFERENCE = 'Conference'
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  role: string;
  type: 'public' | 'leader'; // To distinguish left (public) vs right (leader)
}

export interface MapPoint {
  id: string;
  lat: number; // For simulation, we will use x/y percentages on a static map container
  lng: number; 
  x: number; // Percentage from left
  y: number; // Percentage from top
  locationName: string;
  activityType: ActivityType;
  participants: number;
  date: string;
  description: string;
}

export interface ImpactReport {
  id: string;
  title: string;
  participants: number;
  hours: number;
  summary: string;
  link: string;
  date: string;
  thumbnailUrl?: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  icon?: string;
}

export interface EventSession {
  date: string;
  startTime: string;
  endTime: string;
}

export interface FutureEvent {
  id: string;
  name: string;
  type: ActivityType;
  isMultiDay: boolean;
  sessions: EventSession[];
  locationType: 'online' | 'in-person';
  postcode?: string;
  isHybrid: boolean;
  venueCost: number;
  leadFacilitator: string;
  otherFacilitators: string[];
  publicMemberPay: number;
  outreachType: 'in-reach' | 'out-reach'; // In-reach (coming to us) vs Out-reach (going to community)
}
