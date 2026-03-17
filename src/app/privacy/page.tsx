export const metadata = {
  title: "Privacy Policy | SellersLogin",
};

export default function PrivacyPolicy() {
  return (


    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto", fontFamily: "'Inter', sans-serif", color: "#2d3436", lineHeight: "1.8" }}>
      {/* Standard CSS for the animations */}
      <style>
        {`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade { animation: fadeInUp 0.6s ease-out forwards; }
      .section-card:hover { transform: translateX(5px); transition: all 0.3s ease; }
    `}
      </style>

      <header className="animate-fade" style={{ borderBottom: "2px solid #f1f2f6", marginBottom: "30px", paddingBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0984e3", marginBottom: "10px" }}>Privacy Policy</h1>
        <p style={{ color: "#636e72", fontSize: "0.9rem" }}>
          Effective Date: <strong>{new Date().toLocaleDateString()}</strong>
        </p>
      </header>

      <section className="animate-fade" style={{ animationDelay: "0.1s" }}>
        <p>
          Welcome to <strong>SellersLogin</strong>. We value your trust and are committed to protecting your personal data.
          This policy outlines how [SellersLogin](https://sellerslogin.com) handles your information.
        </p>
      </section>

      <main>
        {[
          {
            title: "1. Information We Collect",
            content: "We collect identifiers (Name, Email, Phone), business details, and technical usage data via cookies to improve your experience."
          },
          {
            title: "2. How We Use Data",
            content: "Your data powers our order processing, security protocols, and automated notifications via WhatsApp, SMS, and Email."
          },
          {
            title: "3. Data Security",
            content: "We employ industry-leading encryption. We do not sell or trade your personal information to third-party advertisers."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="animate-fade section-card"
            style={{
              animationDelay: `${(index + 2) * 0.1}s`,
              margin: "25px 0",
              paddingLeft: "15px",
              borderLeft: "3px solid #dfe6e9"
            }}
          >
            <h2 style={{ fontSize: "1.4rem", color: "#2d3436" }}>{item.title}</h2>
            <p style={{ color: "#636e72" }}>{item.content}</p>
          </div>
        ))}
      </main>

      <section
        className="animate-fade"
        style={{
          animationDelay: "0.6s",
          marginTop: "50px",
          padding: "30px",
          background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
          borderRadius: "15px",
          color: "white"
        }}
      >
        <h2 style={{ color: "white", marginTop: 0 }}>Questions?</h2>
        <p>Our privacy team is here to help. Reach out directly at:</p>
        <a
          href="mailto:pankaj@onlinepromotionhouse.com"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "white",
            color: "#0984e3",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}
        >
          Contact Support
        </a>
      </section>
    </div>
  );
}
