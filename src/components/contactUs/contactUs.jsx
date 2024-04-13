import './contactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="section-heading">
        <h2>Contact Us</h2>
      </div>
      <div className="content">
        <p>
          If you have any questions or inquiries, please feel free to contact
          us using the information below:
        </p>
        <ul className="contact-info">
          <li><strong>Email:</strong> info@example.com</li>
          <li><strong>Phone:</strong> +01 234 567 890</li>
          <li><strong>Address:</strong> New York, NY 10012, US</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
