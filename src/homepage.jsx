import React from "react";
import "./homepage.css";
import {Link} from 'react-router-dom';



function Homepage() {
    return (
        <>
            <nav>
                <h1>MediHub System Rwanda</h1>
                
                <Link to={"/home"} class="link" >Home</Link><span></span>
                 <Link to={"/home"} class="link" >About Us</Link><span></span>
                 <Link to={"/home"} class="link" >Services</Link><span></span>
                <Link to={"/home"} class="link" >How it Works</Link><span></span>
                 <Link to={"home"} class="link" >contact</Link><span></span>
                <Link to={"/register"} class="link" >Register</Link><span></span>
                 <Link to={"/login"} class="link" >Login</Link><span></span>
            
            </nav>

            <div className="welcomingpage">
                <section className="welcome">
                    <p className="wellocome">
                        Access your medical services online anytime, anywhere
                    </p>
                <Link to={"/debreak"} class="link" >Visit Here</Link><span></span>
                </section>
                <br /><br />
            </div>

            <br />

            <div className="sections">
                
                <section id="about" className="about-section">
                    <h2>About MediHub Rwanda</h2>
                    <div className="about-content">
                        <div className="about-card">
                            <h3>Who We Are</h3>
                            <p>
                                MediHub is Rwanda's premier digital health platform, to revolutionize healthcare access. 
                                Born from a vision to bridge gaps in medical service delivery, we've grown from a simple patient-pharmacy 
                                connector to a comprehensive healthcare ecosystem serving thousands daily.
                            </p>
                        </div>

                        <div className="about-card">
                            <h3>Our Mission</h3>
                            <p>
                                To democratize healthcare access across Rwanda by leveraging technology to connect patients with medical 
                                providers, pharmacies, and health information in the most efficient, affordable, and user-friendly way.
                            </p>
                        </div>

                        <div className="about-card">
                            <h3>Our Vision</h3>
                            <p>
                                To become Rwanda's most trusted digital health platform, ensuring accessible, affordable, and efficient healthcare services 
                                for every citizen no matter where they live
                            </p>
                        </div>

                        <div className="about-card">
                            <h3>What We Do</h3>
                            <ul>
                                <li>Connect Patients to Pharmacies for easy medication access</li>
                                <li>Schedule Appointments with doctors and specialists</li>
                                <li>Provide Online Medical Consultationss</li>
                                <li>Maintain secure digital health records</li>
                                <li>Maintain Patient Medical Records securely</li>
                            </ul>
                        </div>

                        <div className="about-card highlight-card">
                            <h3>Why Choose MediHub</h3>
                            <ul>
                                <li><strong>Countrywide Reach</strong>: Accessible from all corners of Rwanda</li>
                                <li><strong>Tailored for Rwanda</strong>: Built to suit local healthcare challenges</li>
                                <li><strong>Affordable Healthcare</strong>: Quality services for every budget</li>
                                <li><strong>Language Friendly</strong>: Supports Kinyarwanda, English, and French</li>
                                <li><strong>All-in-One Platform</strong>: Connects you to pharmacies, doctors, and laboratory results</li>
                            </ul>
                        </div>
                    </div>
                </section>

               
<section id="service" className="service-section">
    <div className="service-header">
        <h2>Services We Provide In MediHub Rwanda</h2>
        <p className="service-subtitle">Comprehensive healthcare solutions at your fingertips</p>
    </div>
    
    <div className="service-content">
        <div className="service-card">
            <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.99 1.99 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            </div>
            <h3>Online Doctor Consultation</h3>
            <div className="card-content">
                <p>Consult with certified doctors online through secure chat or video calls. Get professional medical advice, prescriptions, and follow-up care from home.</p>
                <ul className="service-features">
                    <li>No travel or long hospital waits</li>
                    <li>Available 24/7 for urgent needs</li>
                    <li>Secure and confidential</li>
                </ul>
            </div>
        </div>

        <div className="service-card">
            <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <h3>Health Facility Finder</h3>
            <div className="card-content">
                <p>Locate hospitals, clinics, pharmacies, and labs across Rwanda with detailed information about services and availability.</p>
                <ul className="service-features">
                    <li>Works in both urban and rural areas</li>
                    <li>Real-time availability updates</li>
                    <li>Directions and contact information</li>
                </ul>
            </div>
        </div>

        <div className="service-card">
            <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M4 5h16v14H4V5zm2 2v10h12V7H6zm5 2h2v6h-2V9zm1 6a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </div>
            <h3>Pharmacy Locator & Orders</h3>
            <div className="card-content">
                <p>Find nearby pharmacies, check medicine availability, and manage your prescriptions through our platform.</p>
                <ul className="service-features">
                    <li>Real-time medication availability</li>
                    <li>Online ordering and delivery</li>
                    <li>Prescription management</li>
                </ul>
            </div>
        </div>

        <div className="service-card">
            <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M8 7V5c0-1.1.9-2 2-2h4a2 2 0 012 2v2h4a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9c0-1.1.9-2 2-2h4zm6 2H10v1h4V9zm6 2H4v8h16v-8z" />
                </svg>
            </div>
            <h3>Medical Appointments Booking</h3>
            <div className="card-content">
                <p>Schedule appointments with healthcare providers without waiting in queues or making phone calls.</p>
                <ul className="service-features">
                    <li>Choose preferred providers and times</li>
                    <li>Receive reminders for appointments</li>
                    <li>Reschedule easily when needed</li>
                </ul>
            </div>
        </div>

        <div className="service-card">
            <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3>Health Records Management</h3>
            <div className="card-content">
                <p>Maintain and access your complete medical history in one secure digital location.</p>
                <ul className="service-features">
                    <li>Store test results and prescriptions</li>
                    <li>Share records with doctors securely</li>
                    <li>Track your health history</li>
                </ul>
            </div>
        </div>
    </div>
</section>



  
  <section id="how-it-works" className="how-it-works-section">
    <h2>How MediHub Rwanda Works</h2>
    <div className="how-it-works-steps">

        <div className="step-card">
            <h3>1. Create Your Account</h3>
            <p>
                Sign up using your phone number or email and create a secure profile to access all MediHub services.
            </p>
        </div>

        <div className="step-card">
            <h3>2. Choose a Service</h3>
            <p>
                Select the service you need  like online consultation, pharmacy orders, or booking medical appointments.
            </p>
        </div>

        <div className="step-card">
            <h3>3. Find a Health Provider</h3>
            <p>
                Use the platform to search and connect with nearby doctors, clinics, pharmacies, or hospitals.
            </p>
        </div>

        <div className="step-card">
            <h3>4. Get Care & Stay Updated</h3>
            <p>
                Receive the care you need online or in-person, and keep your health records securely saved in your profile.
            </p>
        </div>

    </div>
</section>


     
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <h1>Contact MediHub Rwanda</h1>
                    <p>We're here to help and answer any questions you may have</p>
                </div>
            </section>

            <div className="contact-container">
                <div className="contact-info">
                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3>Call Us</h3>
                        <p><a href="tel:+250795130378">0795 130 378</a></p>
                        <p>Available 24/7 for emergencies</p>
                    </div>

                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3>Email Us</h3>
                        <p><a href="mailto:medihubrwanda@gmail.com">medihubrwanda@gmail.com</a></p>
                        <p>Response within 24 hours</p>
                    </div>

                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </div>
                        <h3>Social Media</h3>
                        <div className="social-links">
                            <a href="https://wa.me/250795130378" target="_blank" rel="noopener noreferrer">
                                <span className="social-icon whatsapp">WhatsApp</span> 0795 130 378
                            </a>
                            <a href="https://instagram.com/nathan._.32" target="_blank" rel="noopener noreferrer">
                                <span className="social-icon instagram">Instagram</span>nathan
                            </a>
                            <a href="https://twitter.com/medihub_rwanda" target="_blank" rel="noopener noreferrer">
                                <span className="social-icon twitter">Twitter</span> @medihub_rwanda
                            </a>
                            <a href="https://facebook.com/medihub_rwanda" target="_blank" rel="noopener noreferrer">
                                <span className="social-icon facebook">Facebook</span> @medihub_rwanda
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" placeholder="Enter your phone number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" placeholder="What's this about?" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea id="message" rows="5" placeholder="How can we help you?" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </div>

            {/* <div className="map-container">
                <iframe 
                    title="MediHub Rwanda Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.490374240615!2d30.05890981475393!3d-1.953537998570361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMTIuNyJTIDMwwrAzNSczMi4xIkU!5e0!3m2!1sen!2srw!4v1620000000000!5m2!1sen!2srw"
                    allowFullScreen="" 
                    loading="lazy">
                </iframe>
            </div> */}
         </div>

            
        <footer className="medihub-footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h3>MediHub Rwanda</h3>
                        <p>Your trusted digital health partner, connecting you to healthcare services across Rwanda.</p>
                        <div className="footer-social">
                            <a href="https://facebook.com/medihub_rwanda" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/medihub_rwanda" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com/medihub_rwanda" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a href="https://wa.me/250795130378" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/home">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/how-it-works">How It Works</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Contact Info</h4>
                        <ul className="footer-contact">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+250795130378">0795 130 378</a>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:medihubrwanda@gmail.com">medihubrwanda@gmail.com</a>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                                </svg>
                                Kigali, Rwanda
                            </li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Newsletter</h4>
                        <p>Subscribe to our newsletter for health tips and updates</p>
                        <form className="footer-newsletter">
                            <input type="email" placeholder="Your email address" required />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer-partners">
                    <h4>Our Partners</h4>
                    <div className="partner-logos">
                        <div className="partner-logo">
                            <img src="https://via.placeholder.com/100x60?text=RSSB" alt="RSSB" />
                            <span>RSSB</span>
                        </div>
                        <div className="partner-logo">
                            <img src="https://via.placeholder.com/100x60?text=Ministry+of+Health" alt="Ministry of Health" />
                            <span>Ministry of Health</span>
                        </div>
                        <div className="partner-logo">
                            <img src="https://via.placeholder.com/100x60?text=Ministry+of+Sanitation" alt="Ministry of Sanitation" />
                            <span>Ministry of Sanitation</span>
                        </div>
                        <div className="partner-logo">
                            <img src="https://via.placeholder.com/100x60?text=King+Faisal+Hospital" alt="King Faisal Hospital" />
                            <span>King Faisal Hospital</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MediHub Rwanda. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>





            </div>
        </>
    );
}

export default Homepage;
