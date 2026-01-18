
import { ActivityType, ImpactReport, MapPoint, Quote, StatMetric, FutureEvent } from './types';

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'activity', label: 'Activity Map' },
  { id: 'learning_hub', label: 'Learning Hub' },
  { id: 'create_event', label: 'Add Activity' },
];

export const SDE_ORGANISATIONS = [
  "North West Secure Data Environment",
  "London Secure Data Environment",
  "Wessex Secure Data Environment",
  "East of England Secure Data Environment",
  "Yorkshire & Humber Secure Data Environment",
  "Greater Manchester Secure Data Environment",
  "Thames Valley and Surrey Secure Data Environment",
  "Kent, Medway and Sussex Secure Data Environment",
  "South West Secure Data Environment",
  "North East and North Cumbria Secure Data Environment",
  "East Midlands Secure Data Environment",
  "West Midlands Secure Data Environment",
  "NHS England Secure Data Environment",
  "Genomics England",
  "Health Data Research UK (HDR UK)",
  "Other / Academic Institution"
];

export const QUOTES: { public: Quote, leader: Quote }[] = [
  {
    public: {
      id: 'q1',
      text: "As a member of the public, I want to see how a problem was identified and addressed across the full lifecycle, so that I can trust the system is acting openly.",
      author: "Sarah J.",
      role: "Patient Representative",
      type: 'public'
    },
    leader: {
      id: 'l1',
      text: "We need technologies that support engagement efforts by reducing manual disjointed information management and improving insight production.",
      author: "Dr. A. Patel",
      role: "Policy Director",
      type: 'leader'
    }
  },
  {
    public: {
      id: 'q2',
      text: "I want to explore and question reported impacts, so that conclusions can be challenged if they do not reflect lived experience.",
      author: "David M.",
      role: "Community Advocate",
      type: 'public'
    },
    leader: {
      id: 'l2',
      text: "Directing resources to cover gaps allows us to answer policy questions at a greater pace and with improved opportunities to iterate understanding.",
      author: "Prof. L. Thompson",
      role: "Research Lead",
      type: 'leader'
    }
  }
];

export const STATS: StatMetric[] = [
  { label: "Unique people reached", value: "12,450" },
  { label: "Total contacts", value: "45,230" },
  { label: "Total hours of public engagement", value: "3,890" },
  { label: "Research requests reviewed", value: "842" },
];

export const IMPACT_REPORTS: ImpactReport[] = [
  {
    id: 'i1',
    title: "Public Views on Federated Data",
    participants: 124,
    hours: 360,
    date: "Oct 2023",
    summary: "This report details the consensus reached regarding privacy-preserving federated data analysis. Key findings suggest a strong public preference for non-movement of data.",
    link: "#",
    thumbnailUrl: "https://picsum.photos/400/250?random=1"
  },
  {
    id: 'i2',
    title: "NHS SDE Network Transparency",
    participants: 89,
    hours: 150,
    date: "Nov 2023",
    summary: "An evaluation of the current transparency infrastructure. Participants highlighted the need for 'symmetrical transparency' where public and leaders see the same accountability metrics.",
    link: "#",
    thumbnailUrl: "https://picsum.photos/400/250?random=2"
  },
  {
    id: 'i3',
    title: "Digital Point of Sale System Pilot",
    participants: 45,
    hours: 210,
    date: "Dec 2023",
    summary: "Results from the pilot of the new digital engagement tracking tool. Showed a 40% reduction in administrative burden for PPIE professionals.",
    link: "#",
    thumbnailUrl: "https://picsum.photos/400/250?random=3"
  },
  {
    id: 'i4',
    title: "AI in Clinical Trials",
    participants: 230,
    hours: 500,
    date: "Jan 2024",
    summary: "A deliberation on the ethical use of AI. The public emphasized the need for 'Human-in-the-loop' safeguards before full automation is deployed.",
    link: "#",
    thumbnailUrl: "https://picsum.photos/400/250?random=4"
  }
];

export const ACTIVITY_COLORS: Record<ActivityType, string> = {
  [ActivityType.DATA_ACCESS_COMMITTEE]: "#3B82F6", // Blue
  [ActivityType.PUBLIC_ADVISORY_MEETING]: "#10B981", // Green
  [ActivityType.FOCUS_GROUP]: "#F97316", // Orange
  [ActivityType.DELIBERATION]: "#8B5CF6", // Purple
  [ActivityType.TOWNHALL]: "#EF4444", // Red
  [ActivityType.CONFERENCE]: "#EAB308", // Yellow
};

// Recalibrated for the new map projection
export const ACTIVITY_POINTS: MapPoint[] = [
  { id: 'm1', lat: 51.5074, lng: -0.1278, x: 62, y: 78, locationName: "London", activityType: ActivityType.CONFERENCE, participants: 500, date: "2023-10-15", description: "Annual Health Data Research UK Conference focusing on patient trust." },
  { id: 'm2', lat: 53.4808, lng: -2.2426, x: 42, y: 55, locationName: "Manchester", activityType: ActivityType.TOWNHALL, participants: 150, date: "2023-11-02", description: "North West Public Townhall on AI Safety and data governance." },
  { id: 'm3', lat: 55.9533, lng: -3.1883, x: 41, y: 35, locationName: "Edinburgh", activityType: ActivityType.DATA_ACCESS_COMMITTEE, participants: 12, date: "2023-11-20", description: "Scotland DAC Monthly Review for Q4 applications." },
  { id: 'm4', lat: 51.4545, lng: -2.5879, x: 40, y: 78, locationName: "Bristol", activityType: ActivityType.FOCUS_GROUP, participants: 25, date: "2023-12-05", description: "Focus group on youth mental health data sharing preferences." },
  { id: 'm5', lat: 52.4862, lng: -1.8904, x: 45, y: 65, locationName: "Birmingham", activityType: ActivityType.DELIBERATION, participants: 60, date: "2024-01-10", description: "Citizens' Jury on Commercial Access to NHS Data - Day 1." },
  { id: 'm6', lat: 53.9599, lng: -1.0873, x: 55, y: 50, locationName: "York", activityType: ActivityType.PUBLIC_ADVISORY_MEETING, participants: 15, date: "2024-01-15", description: "Yorkshire Patient Advisory Panel regular meeting." },
  { id: 'm7', lat: 51.4816, lng: -3.1791, x: 33, y: 74, locationName: "Cardiff", activityType: ActivityType.FOCUS_GROUP, participants: 30, date: "2023-10-30", description: "Welsh Data Privacy Workshop for elderly populations." },
  { id: 'm8', lat: 54.9783, lng: -1.6178, x: 50, y: 40, locationName: "Newcastle", activityType: ActivityType.TOWNHALL, participants: 200, date: "2023-12-12", description: "North East Health Innovation Summit public forum." },
  { id: 'm9', lat: 51.7520, lng: -1.2577, x: 55, y: 75, locationName: "Oxford", activityType: ActivityType.DATA_ACCESS_COMMITTEE, participants: 8, date: "2024-02-01", description: "Oxford Biobank DAC review meeting." },
  { id: 'm10', lat: 52.2053, lng: 0.1218, x: 65, y: 70, locationName: "Cambridge", activityType: ActivityType.FOCUS_GROUP, participants: 18, date: "2024-02-14", description: "Genomics research feedback session." },
  { id: 'm11', lat: 53.4084, lng: -2.9916, x: 38, y: 55, locationName: "Liverpool", activityType: ActivityType.PUBLIC_ADVISORY_MEETING, participants: 22, date: "2024-02-20", description: "Mersey Care Trust public governors meeting." },
  { id: 'm12', lat: 50.8225, lng: -0.1372, x: 60, y: 88, locationName: "Brighton", activityType: ActivityType.DELIBERATION, participants: 45, date: "2024-03-05", description: "Community deliberation on digital health inequalities." },
  { id: 'm13', lat: 53.8008, lng: -1.5491, x: 52, y: 52, locationName: "Leeds", activityType: ActivityType.CONFERENCE, participants: 350, date: "2024-03-15", description: "Northern Data Forum: Patient Centricity." },
  { id: 'm14', lat: 51.5074, lng: -0.1278, x: 62, y: 80, locationName: "London (South)", activityType: ActivityType.FOCUS_GROUP, participants: 12, date: "2024-03-22", description: "Deep dive: Rare disease patient data handling." },
  // New Northern Ireland point
  { id: 'm15', lat: 54.5973, lng: -5.9301, x: 28, y: 44, locationName: "Belfast", activityType: ActivityType.PUBLIC_ADVISORY_MEETING, participants: 40, date: "2024-03-28", description: "Northern Ireland Health & Social Care meeting." },
];

export const FUTURE_EVENTS: FutureEvent[] = [
  {
    id: 'fe1',
    name: 'National Data Strategy Refresh Workshop',
    type: ActivityType.FOCUS_GROUP,
    isMultiDay: false,
    sessions: [{ date: '2024-06-15', startTime: '14:00', endTime: '16:00' }],
    locationType: 'online',
    isHybrid: false,
    venueCost: 0,
    leadFacilitator: 'Sarah Jenkins (Imperial College)',
    otherFacilitators: ['Dr. Mark Lee'],
    publicMemberPay: 75.00,
    outreachType: 'in-reach'
  },
  {
    id: 'fe2',
    name: 'Midlands Citizens Jury on AI',
    type: ActivityType.DELIBERATION,
    isMultiDay: true,
    sessions: [
      { date: '2024-07-10', startTime: '09:00', endTime: '17:00' },
      { date: '2024-07-11', startTime: '09:00', endTime: '17:00' },
      { date: '2024-07-12', startTime: '09:00', endTime: '13:00' },
    ],
    locationType: 'in-person',
    postcode: 'B4 6AT',
    isHybrid: true,
    venueCost: 4500.00,
    leadFacilitator: 'Participate Ltd.',
    otherFacilitators: [],
    publicMemberPay: 150.00,
    outreachType: 'in-reach'
  },
  {
    id: 'fe3',
    name: 'Community Library Drop-in: Health Records',
    type: ActivityType.TOWNHALL,
    isMultiDay: false,
    sessions: [{ date: '2024-06-22', startTime: '10:00', endTime: '14:00' }],
    locationType: 'in-person',
    postcode: 'M13 9PL',
    isHybrid: false,
    venueCost: 50.00,
    leadFacilitator: 'Manchester Foundation Trust PPIE Team',
    otherFacilitators: ['Local Community Leader'],
    publicMemberPay: 25.00,
    outreachType: 'out-reach'
  }
];