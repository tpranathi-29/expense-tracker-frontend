function SummaryCards({ summary }) {
  const cards = [
    {
      title: "💰 Total Income",
      value: summary.totalIncome,
      color: "#2e7d32",
      background: "#e8f5e9",
      border: "#66bb6a",
      isCurrency: true,
    },
    {
      title: "💸 Total Expense",
      value: summary.totalExpense,
      color: "#d32f2f",
      background: "#ffebee",
      border: "#ef5350",
      isCurrency: true,
    },
    {
      title: "🏦 Current Balance",
      value: summary.balance,
      color: "#1565c0",
      background: "#e3f2fd",
      border: "#42a5f5",
      isCurrency: true,
    },
    {
      title: "📋 Transactions",
      value: summary.totalTransactions,
      color: "#ef6c00",
      background: "#fff3e0",
      border: "#ffa726",
      isCurrency: false,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: card.background,
            borderLeft: `8px solid ${card.border}`,
            borderRadius: "15px",
            padding: "22px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            transition: "0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow =
              "0 12px 25px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(0,0,0,0.12)";
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "17px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            {card.title}
          </p>

          <h1
            style={{
              marginTop: "18px",
              marginBottom: "8px",
              color: card.color,
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {card.isCurrency
              ? `₹ ${Number(card.value || 0).toFixed(2)}`
              : card.value}
          </h1>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              margin: "12px 0",
            }}
          />

          <p
            style={{
              color: "#777",
              margin: 0,
              fontSize: "14px",
            }}
          >
            {card.isCurrency
              ? "Updated from your latest transactions"
              : "Number of recorded transactions"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;