import Contact from "../models/contactModel.js"
import nodemailer from "nodemailer"

// Submit a new contact form
export const submitContact = async (req, res) => {
    try {
        const { firstName, surname, email, message } = req.body

        // Validate required fields
        if (!firstName || !surname || !email || !message) {
            return res.status(400).json({ message: "Please fill all required fields" })
        }

        // Save to database
        const newContact = new Contact(req.body)
        const savedContact = await newContact.save()

        // Send email notification
        try {
            // Configure transporter (this would use your actual SMTP settings in production)
            const transporter = nodemailer.createTransport({
                // Replace with actual SMTP settings
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            })

            // Send email
            await transporter.sendMail({
                from: process.env.SMTP_FROM,
                to: "mtra1234455@gmail.com",
                subject: "New Contact Submission - StellarTel Website",
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${surname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organisation:</strong> ${req.body.organisation || "Not provided"}</p>
          <p><strong>Phone:</strong> ${req.body.phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
            })
        } catch (emailError) {
            console.error("Error sending email notification:", emailError)
            // Continue with the response even if email fails
        }

        res.status(201).json(savedContact)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Get all contacts (for admin purposes)
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 })
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
