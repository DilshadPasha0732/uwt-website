import React, { useState } from "react";
import Swal from "sweetalert2";
import "./FreeTrialPage.css";
import photo from "../../assets/photo01.jpg";

const FreeTrialDemo = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    parentEmail: "",
    phoneCode: "IN (+91)",
    phone: "",
    childName: "",
    classLevel: "",
    hasLaptop: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/free-trial/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          phoneCode: formData.phoneCode,
          phone: formData.phone,
          childName: formData.childName,
          classLevel: formData.classLevel,
          hasLaptop: formData.hasLaptop,
        }),
      });
      const data = await res.json();
      setBtnLoading(false);
      if (res.ok && data.message) {
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: data.message,
          confirmButtonColor: "#8a4baf",
        });
      }
    } catch (err) {
      setBtnLoading(false);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#e53935",
      });
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="free-trial-container">
      <div className="left-section">
        <img src={photo} alt="Online Learning" className="illustration" />
        <h2 className="benefits-title">Benefits</h2>
        <ul className="benefits-list">
          <li>One-to-One Learning</li>
          <li>2500+ Highly Qualified Teachers</li>
          <li>4000+ Subjects</li>
          <li>Convenient and Safe</li>
          <li>Live and Interactive</li>
          <li>Guaranteed Satisfaction</li>
          <li>Safe Payments</li>
        </ul>
      </div>

      <div className="right-section">
        <h2 className="form-title">Book your Free Trial</h2>
        <form className="trial-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="parentName"
            placeholder="Parent's Name"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="parentEmail"
            placeholder="Parent's Email"
            value={formData.parentEmail}
            onChange={handleChange}
            required
          />
          <div className="phone-group">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
            >
              <option>UK (+44)</option>
              <option>IN (+91)</option>
              <option>US (+1)</option>
            </select>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="childName"
            placeholder="Child Name"
            value={formData.childName}
            onChange={handleChange}
            required
          />
          <select
            name="classLevel"
            value={formData.classLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option>Grade 1–5</option>
            <option>Grade 6–8</option>
            <option>Grade 9–12</option>
          </select>

          <label className="laptop-question">
            Do You Have Laptop/PC at home for class?
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasLaptop"
                value="Yes"
                checked={formData.hasLaptop === "Yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasLaptop"
                value="No"
                checked={formData.hasLaptop === "No"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={btnLoading}>
            {btnLoading ? "Scheduling..." : "Schedule a Free Trial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FreeTrialDemo;
