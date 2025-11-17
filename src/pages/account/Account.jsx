import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  // Helper for avatar initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="account-bg">
      {user && (
        <div className="profile modern-card">
          <div className="profile-avatar">
            {/* Avatar circle with initials */}
            <span>{getInitials(user.name)}</span>
          </div>
          <h2 className="profile-title">My Profile</h2>
          <div className="profile-info">
            <div className="profile-row">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{user.name}</span>
            </div>
            {/* Email removed as per new login system */}
            <div className="profile-row">
              <span className="profile-label">Role:</span>
              <span className="profile-value">{user.role}</span>
            </div>
            <div className="profile-actions">
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="common-btn dashboard-btn"
              >
                <MdDashboard /> Dashboard
              </button>
              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="common-btn admin-btn"
                >
                  <MdDashboard /> Admin Dashboard
                </button>
              )}
              <button
                onClick={logoutHandler}
                className="common-btn logout-btn"
              >
                <IoMdLogOut /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
