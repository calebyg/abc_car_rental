const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

// POST tickets to database
router.post("/export-tickets", async (req, res) => {
  const { tickets } = req.body;

  if (!tickets || !Array.isArray(tickets)) {
    return res.status(400).json({ error: "Invalid ticket data." });
  }

  try {
    // Format to readable text
    const formattedText = tickets
      .map(
        (t, index) =>
          `Ticket #${index + 1}\nIssue: ${t.issue}\nStatus: ${
            t.status
          }\nNote: ${t.note}\n---\n`
      )
      .join("\n");

    const filePath = "./tickets-log.txt";
    fs.writeFileSync(filePath, formattedText);

    // Email transport setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Rental Tracker" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "Rental Issue Log Report",
      text: "Attached is the ticket log for rental issues.",
      attachments: [{ filename: "tickets-log.txt", path: filePath }],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Tickets exported and emailed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to export or send tickets" });
  }
});

module.exports = router;