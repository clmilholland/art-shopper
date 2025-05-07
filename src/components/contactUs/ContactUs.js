import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setFormData({ name: "", email: "", message: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Hide message after 3s
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.intro}>
                Have questions or ideas? Reach out to the Artria team! We’re passionate about bringing art to your home and would love to hear from you.
            </p>
            <div className={styles.content}>
                <div className={styles.contactInfo}>
                    <h2 className={styles.subtitle}>Get in Touch</h2>
                    <div className={styles.infoRow}>
                        <div className={styles.infoItem}>
                            <FaEnvelope className={styles.icon} />
                            <p><strong>Email:</strong> contact@artria.com</p>
                        </div>
                        <div className={styles.infoItem}>
                            <FaMapMarkerAlt className={styles.icon} />
                            <p><strong>Address:</strong> 123 Art Lane, New York, NY 10001</p>
                        </div>
                        <div className={styles.infoItem}>
                            <FaPhone className={styles.icon} />
                            <p><strong>Phone:</strong> (555) 123-4567</p>
                        </div>
                    </div>
                </div>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    {submitted && (
                        <div className={styles.successMessage}>
                            Thank you! Your message has been sent.
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.formLabel}>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.formInput}
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.formInput}
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.formLabel}>Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={styles.formInput}
                            placeholder="Your Message"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton}>Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;