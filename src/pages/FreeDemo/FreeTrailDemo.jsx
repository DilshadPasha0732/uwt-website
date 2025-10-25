import React from "react";
import "./FreeTrialPage.css";
import photo from "../../assets/photo01.jpg";

const FreeTrialDemo = () => {
  return (
    <div className="free-trial-container">
      {/* Left Side */}
      <div className="left-section">
        <img
          src={photo}
          alt="Online Learning"
          className="illustration"
        />
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

      {/* Right Side */}
      <div className="right-section">
        <h2 className="form-title">Book your Free Trial</h2>
        <form className="trial-form">
          <input type="text" placeholder="Parent's Name" required />
          <input type="email" placeholder="Parent's Email" required />
          <div className="phone-group">
            <select>
              <option>UK (+44)</option>
              <option>IN (+91)</option>
              <option>US (+1)</option>
            </select>
            <input type="text" placeholder="Phone" />
          </div>
          <input type="text" placeholder="Child Name" required />
          <select required>
            <option>Select Class</option>
            <option>Grade 1–5</option>
            <option>Grade 6–8</option>
            <option>Grade 9–12</option>
          </select>

          <label className="laptop-question">
            Do You Have Laptop/PC at home for class?
          </label>
          <div className="radio-group">
            <label><input type="radio" name="laptop" /> Yes</label>
            <label><input type="radio" name="laptop" /> No</label>
          </div>

          <button type="submit" className="submit-btn">
            Schedule a Free Trial
          </button>
        </form>
      </div>
    </div>
  );
};

export default FreeTrialDemo;
