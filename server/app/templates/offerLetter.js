const generateOfferLetterHTML = ({
  candidateName,
  companyName,
  jobTitle,
  salary,
  joiningDate,
  employmentType,
  location,
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />

      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 50px;
          color: #222;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .company {
          font-size: 28px;
          font-weight: bold;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin-top: 30px;
          text-align: center;
        }

        .content {
          margin-top: 35px;
          font-size: 16px;
          line-height: 1.7;
        }

        .details {
          margin: 25px 0;
        }

        .details p {
          margin: 8px 0;
        }

        .signature {
          margin-top: 60px;
        }
      </style>
    </head>

    <body>

      <div class="header">
        <div class="company">${companyName}</div>
      </div>

      <div class="title">
        OFFER LETTER
      </div>

      <div class="content">

        <p>
          Date: ${new Date().toLocaleDateString("en-IN")}
        </p>

        <p>
          Dear <strong>${candidateName}</strong>,
        </p>

        <p>
          We are pleased to offer you the position of
          <strong>${jobTitle}</strong> at
          <strong>${companyName}</strong>.
        </p>

        <div class="details">

          <p>
            <strong>Position:</strong> ${jobTitle}
          </p>

          <p>
            <strong>Salary:</strong> ₹${salary}
          </p>

          <p>
            <strong>Joining Date:</strong> ${joiningDate}
          </p>

          <p>
            <strong>Employment Type:</strong> ${employmentType}
          </p>

          <p>
            <strong>Location:</strong> ${location}
          </p>

        </div>

        <p>
          We are excited to have you join our team and look forward
          to your contribution to the organization.
        </p>

        <p>
          Please find the terms and conditions of your employment
          as outlined in this offer.
        </p>

        <div class="signature">

          <p>
            Sincerely,
          </p>

          <p>
            <strong>${companyName}</strong>
          </p>

          <p>
            HR Manager
          </p>

        </div>

      </div>

    </body>
    </html>
  `;
};

module.exports = generateOfferLetterHTML;