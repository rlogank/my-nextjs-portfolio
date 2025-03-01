import type * as React from "react";

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmailTemplate: React.FC<
  Readonly<ContactEmailTemplateProps>
> = ({ name, email, message }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "600px",
    }}
  >
    <h2
      style={{
        color: "#333",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px",
      }}
    >
      New Contact Form Message
    </h2>
    <div style={{ margin: "20px 0" }}>
      <p style={{ margin: "5px 0", fontSize: "16px" }}>
        <strong>Name:</strong> {name}
      </p>
      <p style={{ margin: "5px 0", fontSize: "16px" }}>
        <strong>Email:</strong> {email}
      </p>
    </div>
    <div style={{ margin: "20px 0" }}>
      <h3 style={{ color: "#555", fontSize: "18px" }}>Message:</h3>
      <p
        style={{
          padding: "15px",
          background: "#f9f9f9",
          borderRadius: "5px",
          fontSize: "16px",
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </p>
    </div>
    <div
      style={{
        marginTop: "30px",
        fontSize: "14px",
        color: "#777",
        borderTop: "1px solid #eee",
        paddingTop: "10px",
      }}
    >
      <p>This message was sent from the contact form on rlogank.com</p>
    </div>
  </div>
);
