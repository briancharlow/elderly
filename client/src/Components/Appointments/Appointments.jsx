import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentList = ({ userRole }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/getappointments");
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      await axios.post(`/acceptappointment/${appointmentId}`);
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
      await axios.post(`/rejectappointment/${appointmentId}`);
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
            {userRole === "client" && (
              <div>
                <strong>Caregiver:</strong> {appointment.caregiverName}
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
