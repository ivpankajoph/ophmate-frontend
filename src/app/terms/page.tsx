// export const metadata = {
//   title: "Terms of Service | SellersLogin",
// };

// export default function TermsPage() {
//   return (
//     <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
//       <h1>Terms of Service</h1>

//       <p>
//         By using websites and services under SellersLogin, you agree to comply
//         with these Terms of Service.
//       </p>

//       <h2>Use of Service</h2>
//       <p>You agree not to misuse or harm the platform in any way.</p>

//       <h2>User Responsibilities</h2>
//       <ul>
//         <li>You must provide accurate information.</li>
//         <li>You are responsible for keeping your account secure.</li>
//         <li>No fraudulent activities are allowed.</li>
//       </ul>

//       <h2>Communication Consent</h2>
//       <p>
//         You allow us to communicate via WhatsApp, SMS, email, and phone to
//         deliver services.
//       </p>

//       <h2>Liability</h2>
//       <p>
//         SellersLogin is not responsible for damages resulting from misuse or
//         unauthorized access.
//       </p>

//       <h2>Changes</h2>
//       <p>
//         We may update these terms at any time. Continued use means acceptance of
//         updated terms.
//       </p>

//       <h2>Contact Us</h2>
//       <p>Email: pankaj@onlinepromotionhouse.com</p>
//     </div>
//   );
// }
import React from 'react';

const TermsOfService = () => {
  return (
    <div style={{ 
      padding: "40px 20px", 
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    }}>
      <style>
        {`
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .main-card {
            animation: slideInUp 0.6s ease-out;
            transition: all 0.3s ease;
          }
          .main-card:hover {
            box-shadow: 0 30px 60px rgba(0,0,0,0.12);
          }
          h2 { 
            color: #2563eb; 
            font-size: 1.4rem; 
            margin-top: 30px; 
            border-bottom: 2px solid #eff6ff;
            padding-bottom: 8px;
          }
          li { margin-bottom: 10px; }
          p { line-height: 1.6; color: #475569; }
        `}
      </style>

      <div className="main-card" style={{ 
        maxWidth: "900px", 
        margin: "auto", 
        backgroundColor: "#ffffff",
        padding: "60px",
        borderRadius: "24px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        border: "1px solid rgba(255,255,255,0.3)"
      }}>
        <h1 style={{ 
          fontSize: "2.8rem", 
          margin: "0 0 20px 0", 
          color: "#1e293b",
          textAlign: "center" 
        }}>
          Terms of Service
        </h1>

        <p style={{ fontSize: "1.1rem", textAlign: "center", marginBottom: "40px" }}>
          By using websites and services under <strong>SellersLogin</strong>, you agree to comply
          with these Terms of Service.
        </p>

        <section>
          <h2>Use of Service</h2>
          <p>You agree not to misuse or harm the platform in any way.</p>
        </section>

        <section>
          <h2>User Responsibilities</h2>
          <ul style={{ color: "#475569" }}>
            <li>You must provide accurate information.</li>
            <li>You are responsible for keeping your account secure.</li>
            <li>No fraudulent activities are allowed.</li>
          </ul>
        </section>

        <section>
          <h2>Communication Consent</h2>
          <p>
            You allow us to communicate via WhatsApp, SMS, email, and phone to
            deliver services.
          </p>
        </section>

        <section>
          <h2>Liability</h2>
          <p>
            SellersLogin is not responsible for damages resulting from misuse or
            unauthorized access.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            We may update these terms at any time. Continued use means acceptance of
            updated terms.
          </p>
        </section>

        <section style={{ 
          marginTop: "40px", 
          padding: "25px", 
          backgroundColor: "#f1f5f9", 
          borderRadius: "15px" 
        }}>
          <h2 style={{ marginTop: 0, border: "none" }}>Contact Us</h2>
          <p style={{ margin: 0 }}>
            Email: <a href="mailto:pankaj@onlinepromotionhouse.com" style={{ 
              color: "#2563eb", 
              textDecoration: "none", 
              fontWeight: "600" 
            }}>
              pankaj@onlinepromotionhouse.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;