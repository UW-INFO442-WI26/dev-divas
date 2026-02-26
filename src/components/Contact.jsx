import { useState } from "react";
import "../css/Contact.css";

function Card({ label, children }) {
  return (
    <div className="contact-card">
      <label className="contact-label">{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const update = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="contact-page">
      <div className="contact-wrap">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Need further assistance, have any questions, or just want to leave feedback,
          contact us!
        </p>

        <form className="contact-form">
          <Card label="First Name">
            <input
              className="contact-input"
              value={form.firstName}
              onChange={update("firstName")}
            />
          </Card>

          <Card label="Last Name">
            <input
              className="contact-input"
              value={form.lastName}
              onChange={update("lastName")}
            />
          </Card>

          <Card label="Email">
            <input
              className="contact-input"
              value={form.email}
              onChange={update("email")}
            />
          </Card>

          <Card label="Message">
            <textarea
              className="contact-textarea"
              value={form.message}
              onChange={update("message")}
            />
          </Card>

          <button className="contact-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}