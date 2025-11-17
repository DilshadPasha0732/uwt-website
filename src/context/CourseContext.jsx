import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error("Error fetching course:", error.message);
    }
  }

  async function fetchMyCourse() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ No token found — user might not be logged in");
        return;
      }

      const { data } = await axios.get(`${server}/api/course/mycourse`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (data.courses) {
        setMyCourse(data.courses);
      }
    } catch (error) {
      console.error("Error fetching my courses:", error.response?.data?.message || error.message);
    }
  }

  // Only fetch courses on initial load
  useEffect(() => {
    fetchCourses();
  }, []);

  // Only fetch user's courses if they're authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchMyCourse();
    }
  }, []);

  return (
    <CourseContext.Provider
      value={{ courses, fetchCourses, fetchCourse, course, mycourse, fetchMyCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
