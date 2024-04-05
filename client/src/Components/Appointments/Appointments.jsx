import React, { useState, useEffect } from "react";
import axios from "axios";

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
        if (appointment.id === appointmentId) {
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
        if (appointment.id === appointmentId) {
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
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div>
              <strong>Date:</strong> {appointment.date}
            </div>
            <div>
              <strong>Time:</strong> {appointment.time}
            </div>
            {userRole === "caregiver" && (
              <div className="appointment-actions">
                <button
                  onClick={() => handleAcceptAppointment(appointment.id)}
                  disabled={appointment.status === "accepted"}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectAppointment(appointment.id)}
                  disabled={appointment.status === "rejected"}
                >
                  Reject
                </button>
              </div>
            )}
            {userRole === "guardian" && (
              <div>
                <strong>Caregiver:</strong> {appointment.caregiver_name}
                <div>
                  <strong>Status:</strong> {appointment.status}
                  {appointment.status === "pending" && (
                    <span> (kindly wait for a response)</span>
                  )}
                  {appointment.status === "rejected" && (
                    <span>
                      {" "}
                      (kindly consider rescheduling or finding a new caregiver)
                    </span>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
