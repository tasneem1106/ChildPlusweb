/**
 * Child Plus - REST API Client & Auth Manager
 * Manages JWT sessions, user authentication, role checks, and backend endpoint calls.
 */

class ApiService {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("childplus_user") || "null");
  }

  async login(username, password) {
    const users = window.DB.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem("childplus_user", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: "Invalid credentials! Check username or password." };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("childplus_user");
    window.location.reload();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async getChildren(centerId = null) {
    return window.DB.getChildren(centerId);
  }

  async getChildById(id) {
    return window.DB.getChildById(id);
  }

  async saveGrowthRecord(childId, record) {
    return window.DB.addGrowthRecord(childId, record);
  }

  async logActivity(childId, activity) {
    return window.DB.addActivityLog(childId, activity);
  }
}

window.API = new ApiService();
