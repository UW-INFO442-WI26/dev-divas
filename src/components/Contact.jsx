import "../css/Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions or want to volunteer, feel free to reach out!</p>

      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Your Name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Your Email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" rows="5" placeholder="Your Message"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;