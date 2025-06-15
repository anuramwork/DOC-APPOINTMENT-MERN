export const generateCancelAppointmentEmailHTML = (appointmentData) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      
      <!-- Logo -->
      <tr>
        <td style="text-align: center; padding: 20px;">
          <img src="https://yourclinicdomain.com/logo.png" alt="Clinic Logo" style="max-width: 120px; height: auto;" />
        </td>
      </tr>

      <!-- Header -->
      <tr>
        <td style="background-color: #dc3545; padding: 20px; color: #ffffff; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Appointment Cancelled</h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Hello <strong>${appointmentData.userData.name}</strong>,
          </p>

          <p style="font-size: 16px; margin-bottom: 20px;">
            We're sorry to inform you that your appointment has been <span style="color: #dc3545; font-weight: bold;">cancelled</span>. Here are the appointment details:
          </p>

          <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>Doctor</strong></td>
              <td style="padding: 8px 0;">${appointmentData.docData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Date</strong></td>
              <td style="padding: 8px 0;">${appointmentData.slotDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Time</strong></td>
              <td style="padding: 8px 0;">${appointmentData.slotTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Fees</strong></td>
              <td style="padding: 8px 0;">₹${appointmentData.amount}</td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <p style="font-size: 15px;">If this was a mistake or if you need to rebook, please visit our clinic portal or contact us directly.</p>
            <p style="margin-top: 20px;">We apologize for any inconvenience caused.</p>
            <p>Thank you,<br><strong>The Clinic Team</strong></p>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #555;">
          © ${new Date().getFullYear()} Your Clinic Name. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;
