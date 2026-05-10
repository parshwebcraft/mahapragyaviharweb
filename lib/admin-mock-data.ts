export type AdminRoomStatus = "available" | "occupied" | "reserved" | "maintenance";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type InquiryStatus = "new" | "contacted" | "site_visit" | "closed";
export type Priority = "high" | "medium" | "low";
export type EmployeeStatus = "active" | "on_leave" | "inactive";
export type AttendanceStatus = "present" | "absent" | "leave";
export type SalaryStatus = "paid" | "pending";

export interface AdminRoom {
  id: string;
  roomNumber: string;
  roomType: "Deluxe AC Room" | "Super Deluxe AC Room" | "Premium Family AC Room";
  occupancy: number;
  status: AdminRoomStatus;
  guestName: string;
  checkIn: string;
  checkOut: string;
  notes: string;
  history: string[];
}

export interface AdminBooking {
  id: string;
  guestName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomAssigned: string;
  roomCount: number;
  status: BookingStatus;
  source: string;
}

export interface WeddingInquiry {
  id: string;
  familyName: string;
  phone: string;
  functionDate: string;
  guestCount: number;
  roomsRequired: number;
  notes: string;
  status: InquiryStatus;
  priority: Priority;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: "Reception" | "Management" | "Cleaning" | "Kitchen" | "Event Support" | "IT";
  phone: string;
  joiningDate: string;
  salary: number;
  status: EmployeeStatus;
}

export interface AttendanceRecord {
  employeeId: string;
  employeeName: string;
  department: string;
  days: AttendanceStatus[];
}

export interface SalaryRecord {
  id: string;
  employeeName: string;
  department: string;
  month: string;
  salary: number;
  advance: number;
  paidOn: string;
  status: SalaryStatus;
}

const roomTypes: AdminRoom["roomType"][] = [
  "Deluxe AC Room",
  "Super Deluxe AC Room",
  "Premium Family AC Room"
];

export const adminRooms: AdminRoom[] = Array.from({ length: 50 }, (_, index) => {
  return {
    id: `room-${index + 1}`,
    roomNumber: `AC-${String(index + 1).padStart(2, "0")}`,
    roomType: roomTypes[index % roomTypes.length],
    occupancy: index % 3 === 0 ? 4 : index % 2 === 0 ? 3 : 2,
    status: "available",
    guestName: "",
    checkIn: "",
    checkOut: "",
    notes: "Ready for check-in",
    history: []
  };
});

export const adminBookings: AdminBooking[] = [];

export const weddingInquiries: WeddingInquiry[] = [];

export const employees: Employee[] = [];

export const attendanceRecords: AttendanceRecord[] = employees.map((employee, index) => ({
  employeeId: employee.id,
  employeeName: employee.name,
  department: employee.department,
  days: Array.from({ length: 30 }, (_, day) =>
    (day + index) % 11 === 0 ? "leave" : (day + index) % 7 === 0 ? "absent" : "present"
  )
}));

export const salaryRecords: SalaryRecord[] = employees.map((employee, index) => ({
  id: `SAL-${index + 1}`,
  employeeName: employee.name,
  department: employee.department,
  month: "May 2026",
  salary: employee.salary,
  advance: index % 2 === 0 ? 4000 : 0,
  paidOn: index % 2 === 0 ? "2026-05-05" : "",
  status: index % 2 === 0 ? "paid" : "pending"
}));

export const monthlyBookingChart = [
  { month: "Jan", bookings: 0, revenue: 0, occupancy: 0 },
  { month: "Feb", bookings: 0, revenue: 0, occupancy: 0 },
  { month: "Mar", bookings: 0, revenue: 0, occupancy: 0 },
  { month: "Apr", bookings: 0, revenue: 0, occupancy: 0 },
  { month: "May", bookings: 0, revenue: 0, occupancy: 0 },
  { month: "Jun", bookings: 0, revenue: 0, occupancy: 0 }
];
