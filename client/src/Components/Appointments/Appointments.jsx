import React, { useState, useEffect } from "react";
import axios from "axios";
import "./appointments.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getsession", {
          withCredentials: true,
        });
        const sessionData = response.data;

        if (sessionData.authorized) {
          setUserRole(sessionData.role);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getappointments",
          {
            withCredentials: true,
          }
        );
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
      }
    };

    fetchUserRole();
    fetchAppointments();
  }, []);

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      await axios.post(
        `http://localhost:5000/acceptappointment/${appointmentId}`,
        {},
        { withCredentials: true }
      );
      // Update the appointment status in the local state
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.appointment_id === appointmentId) {
          return { ...appointment, status: "accepted" };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    try {
      await axios.post(
        `http://localhost:5000/rejectappointment/${appointmentId}`,
        {},
        { withCredentials: true }
      );
      // Update the appointment status in the local state
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.appointment_id === appointmentId) {
          return { ...appointment, status: "rejected" };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="appointment-list-container">
      <h2>Appointments</h2>
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div key={appointment.appointment_id} className="appointment-item">
            <div className="appointment-details">
              <div className="appointment-date">
                {new Date(appointment.date).toLocaleDateString()}
              </div>
              <div className="appointment-times">
                <div>
                  <strong>Start:</strong>{" "}
                  {new Date(appointment.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  <strong>End:</strong>{" "}
                  {new Date(appointment.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
            <div className="appointment-info">
              <div>
                <strong>Client:</strong> {appointment.client_name}
              </div>
              <div>
                <strong>Caregiver:</strong> {appointment.caregiver_name}
              </div>
              <div>
                <strong>Status:</strong> {appointment.status}
              </div>
            </div>
            {userRole === "caregiver" && (
              <div className="appointment-actions">
                <button
                  onClick={() =>
                    handleAcceptAppointment(appointment.appointment_id)
                  }
                  disabled={appointment.status === "accepted"}
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleRejectAppointment(appointment.appointment_id)
                  }
                  disabled={appointment.status === "rejected"}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
