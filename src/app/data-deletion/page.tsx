// export const metadata = {
//   title: "Data Deletion | SellersLogin",
// };

// export default function DataDeletionPage() {
//   return (
//     <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
//       <h1>Data Deletion Instructions</h1>

//       <p>
//         At SellersLogin, we respect your right to delete your personal data at
//         any time.
//       </p>

//       <h2>How to Request Data Deletion</h2>
//       <p>
//         Email us at <b>pankaj@onlinepromotionhouse.com</b> with the subject
//         line: <i>“Data Deletion Request”</i>.
//       </p>

//       <h2>Data That Will Be Deleted</h2>
//       <ul>
//         <li>Your account information</li>
//         <li>Name, email, and phone number</li>
//         <li>Business information</li>
//         <li>Stored orders & user activity</li>
//       </ul>

//       <h2>Processing Time</h2>
//       <p>We process deletion requests within 48–72 hours.</p>

//       <h2>Legal Exceptions</h2>
//       <p>
//         Some data may be retained if required for tax, billing, or legal
//         compliance.
//       </p>
//     </div>
//   );
// }


import React from 'react';

const DataDeletion = () => {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", 
      padding: "60px 20px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: "flex",
      alignItems: "center"
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .deletion-card {
            animation: fadeIn 0.7s ease-out;
            transition: box-shadow 0.3s ease;
          }
          .deletion-card:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          }
          h2 { 
            color: #1e293b; 
            font-size: 1.35rem; 
            margin-top: 32px; 
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }
          /* Subtle accent line for headers */
          h2::before {
            content: "";
            width: 4px;
            height: 20px;
            background: #ef4444; /* Red accent for 'deletion' context */
            margin-right: 12px;
            border-radius: 2px;
          }
          p, li { line-height: 1.6; color: #475569; }
          ul { padding-left: 20px; }
          li { margin-bottom: 8px; }
        `}
      </style>

      <div className="deletion-card" style={{ 
        maxWidth: "850px", 
        margin: "auto", 
        backgroundColor: "#ffffff", 
        padding: "50px", 
        borderRadius: "24px", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{ 
          textAlign: "center", 
          fontSize: "2.4rem", 
          color: "#0f172a", 
          marginBottom: "16px" 
        }}>
          Data Deletion Instructions
        </h1>
        
        <div style={{ 
          width: "50px", 
          height: "4px", 
          background: "#ef4444", 
          margin: "0 auto 35px auto", 
          borderRadius: "2px" 
        }}></div>

        <p style={{ fontSize: "1.1rem", textAlign: "center", marginBottom: "40px" }}>
          At <strong>SellersLogin</strong>, we respect your right to delete your personal data at any time.
        </p>

        <hr style={{ border: "0", borderTop: "1px solid #f1f5f9", margin: "20px 0" }} />

        <h2>How to Request Data Deletion</h2>
        <p>
          Email us at <a href="mailto:pankaj@onlinepromotionhouse.com" style={{ color: "#ef4444", textDecoration: "none", fontWeight: "bold" }}>pankaj@onlinepromotionhouse.com</a> with the subject
          line: <i style={{ color: "#1e293b" }}>“Data Deletion Request”</i>.
        </p>

        <h2>Data That Will Be Deleted</h2>
        <ul>
          <li>Your account information</li>
          <li>Name, email, and phone number</li>
          <li>Business information</li>
          <li>Stored orders & user activity</li>
        </ul>

        <h2>Processing Time</h2>
        <p>We process deletion requests within 48–72 hours.</p>

        <h2>Legal Exceptions</h2>
        <p>
          Some data may be retained if required for tax, billing, or legal
          compliance.
        </p>

        <div style={{ 
          marginTop: "50px", 
          padding: "20px", 
          border: "1px dashed #cbd5e1", 
          borderRadius: "12px", 
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#94a3b8"
        }}>
          If you have further questions regarding your privacy, please contact our support team.
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;