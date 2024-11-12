export interface User {
  id: string;
  username: string;
  role: 'SUPER_ADMIN' | 'OPS_HEAD' | 'OPERATIONS';
  email: string;
}

export interface TransportData {
  id: string;
  vendor: string;
  office: string;
  date: string;
  shiftTime: string;
  tripType: string;
  routeType: string;
  tripId: string;
  routeName: string;
  routeNumber: string;
  vehicleRegNo: string;
  driver: string;
  vehicleType: string;
  rostered: number;
  boarded: number;
  guard: boolean;
  plannedKms: number;
  actualKms: number;
  locality: string;
  zone: string;
  actualLocality: string;
  actualZone: string;
  billingCodeP: string;
  costP: number;
  billingCodeA: string;
  costA: number;
  remarks: string;
  finalDistance: number;
  finalCost: number;
}