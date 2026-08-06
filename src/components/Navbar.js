import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #1976d2, #1565c0)",
        color: "#fff",
        padding: "15px 30px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          💰 Expense Tracker
        </h2>

        <p
          style={{
            margin: "5px 0 0 0",
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          Track your income and expenses efficiently
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#fff",
          color: "#1976d2",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f5f5f5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
        }}
      >
        🚪 Logout
      </button>
    </nav>
  );
}

export default Navbar;