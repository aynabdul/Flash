"use client";

import React, { useState } from "react";
import "../../styles/contact-form.css";

interface ContactFormProps {
  paragraph?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ paragraph }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      setSubmitMessage("Name and phone are required.");
      return;
    }

    if (!email.includes("@gmail.com")) {
      setSubmitMessage("Please enter a valid Gmail address.");
      return;
    }

    if (!message) {
      setSubmitMessage("Message cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, message }),
      });

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="basic-card">
      <div className="contact-form-container">
        <div className="contact-form">
          <h1 className="contact-form-title">GET IN TOUCH</h1>
          {paragraph && <p className="contact-form-paragraph">{paragraph}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <div className="button-container">
              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Sending..." : "SEND"}
              </button>
            </div>
            {submitMessage && <p className="submit-message">{submitMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}  

export default ContactForm;