export interface VehicleInput {
    reg_num: string;      // Vehicle Registration Number
    color: string;        // Color of the vehicle
    car_model: string;    // Model of the car
    license_num: string;  // Driver's License Number
  }
 export interface VehicleResponse {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    // Add other fields as necessary
  }
  