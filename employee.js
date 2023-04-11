const COMPANY_LATITUDE = 37.7749;
const COMPANY_LONGITUDE = -122.4194;
const COMPANY_RADIUS = 100; // meters

const EMAIL_ADDRESS = "rayford@oc.com"; // meters
const PASSWORD = "password"; // meters

class Employee {
  constructor() {
    this.clockInTime = null;
    this.clockOutTime = null;
  }

  // Log in the employee
  login(email, password) {
    if (email === EMAIL_ADDRESS && password === PASSWORD) {
      console.log("Login successful.");
      return true;
    } else {
      console.log("Invalid email or password.");
      return false;
    }
  }

  // Clock in the employee if they are on premise
  clockIn(latitude, longitude) {
    if (this.clockInTime) {
      console.log("You are already clocked in.");
      return false;
    }

    const distance = this.getDistanceFromLatLonInMeters(
      latitude,
      longitude,
      COMPANY_LATITUDE,
      COMPANY_LONGITUDE
    );

    if (distance > COMPANY_RADIUS) {
      console.log("You are not on company premises.");
      return false;
    }

    this.clockInTime = new Date();
    console.log(`Clocked in at ${this.clockInTime}.`);
    return true;
  }

  // Clock out the employee
  clockOut() {
    if (!this.clockInTime) {
      console.log("You are not clocked in.");
      return false;
    }

    this.clockOutTime = new Date();
    console.log(`Clocked out at ${this.clockOutTime}.`);
    return true;
  }

  getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000; // meters
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

module.exports = Employee;
