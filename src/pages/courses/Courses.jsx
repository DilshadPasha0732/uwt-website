import React from "react";
import { BookOpen, Music, Code, Globe2, Brush, Layers } from "lucide-react";
import "./courses.css";

export default function CoursesPage() {
  const academicSubjects = [
    "Geography", "Hindi", "Physics", "Chemistry", "Marketing Management",
    "Biology", "Economics", "Finance Management", "Social Studies",
    "Accountancy", "Statistics", "History", "Business Studies",
    "Civics", "Algebra", "Political Science"
  ];

  const nonAcademicSubjects = [
    "Violin / Piano / Flute", "Vedic Maths", "Abacus", "Rubik's Cube / Public Speaking",
    "Logical Reasoning / Chess", "Guitar", "French", "Spanish (Competitive Exams)",
    "Art & Craft", "All Dance Forms", "All Music Forms", "Coding",
    "Java", "Python", "And 50+ More Subjects!"
  ];

  return (
    <div className="courses-container">
      <header className="courses-header">
        <h1>📚 Explore Our Courses</h1>
        <p className="tagline">
          Choose from a wide range of academic and creative learning experiences — all designed to inspire growth and curiosity!
        </p>
      </header>

      <section className="courses">
        <div className="course-category">
          <div className="icon academic"><BookOpen /></div>
          <h3>Academic Subjects</h3>
          <ul>
            {academicSubjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>

        <div className="course-category">
          <div className="icon nonacademic"><Music /></div>
          <h3>Non-Academic Subjects</h3>
          <ul>
            {nonAcademicSubjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>
      </section>

      
    </div>
  );
}
