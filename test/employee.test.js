const Employee = require("../employee");

describe("Employee", () => {
  let employee;

  beforeEach(() => {
    employee = new Employee();
  });

  describe("login", () => {
    it("should return true for valid email and password", () => {
      const result = employee.login("rayford@oc.com", "password");
      expect(result).toBe(true);
    });

    it("should return false for invalid email or password", () => {
      const result = employee.login("invalid@example.com", "wrong");
      expect(result).toBe(false);
    });
  });

  describe("clockIn", () => {
    it("should return false if already clocked in", () => {
      employee.clockIn(37.7749, -122.4194);
      const result = employee.clockIn(37.7749, -122.4194);
      expect(result).toBe(false);
    });

    it("should clock in if on company premises and not already clocked in", () => {
      const result = employee.clockIn(37.7749, -122.4194);
      expect(result).toBe(true);
      expect(employee.clockInTime).not.toBeNull();
    });

    it("should return true and set clockInTime for valid location", () => {
      expect(employee.clockIn(37.7749, -122.4194)).toBe(true);
      expect(employee.clockInTime).not.toBe(null);
    });
  });

  describe("clockOut", () => {
    it("should return true if employee is clocked in", () => {
      employee.clockIn(37.7749, -122.4194);
      const result = employee.clockOut();
      expect(result).toBe(true);
    });

    it("should return false if employee is not clocked in", () => {
      const result = employee.clockOut();
      expect(result).toBe(false);
    });
  });
});
