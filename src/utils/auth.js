// src/utils/auth.js
export const getAuth = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    return token && role ? { token, role, email } : null;
  };
  
  export const logout = () => {
    localStorage.clear();
    window.location.href = "/choose-role?action=login";
  };
  