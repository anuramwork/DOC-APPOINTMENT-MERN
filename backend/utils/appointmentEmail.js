export const generateAppointmentEmailHTML = (appointmentData) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <tr>
        <td style="background-color: #2c7be5; padding: 20px; color: #ffffff; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Appointment Confirmation</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Hello <strong>${appointmentData.patientName}</strong>,
          </p>

          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for booking an appointment. Here are your appointment details:
          </p>

          <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>Doctor</strong></td>
              <td style="padding: 8px 0;">${appointmentData.doctorName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Date</strong></td>
              <td style="padding: 8px 0;">${appointmentData.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Time</strong></td>
              <td style="padding: 8px 0;">${appointmentData.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Fees</strong></td>
              <td style="padding: 8px 0;">₹${appointmentData.amount}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Status</strong></td>
              <td style="padding: 8px 0;">Booked</td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <p style="font-size: 15px;">If you have any questions or need to reschedule, please contact our support team.</p>
            <p style="margin-top: 20px;">Thank you,<br><strong>The Clinic Team</strong></p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #555;">
          © ${new Date().getFullYear()} Your Clinic Name. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;
