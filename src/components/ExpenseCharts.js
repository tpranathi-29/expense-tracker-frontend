import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

function ExpenseCharts({ expenses }) {

  const income = expenses
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expense = expenses
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const pieData = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expense",
      value: expense,
    },
  ];

  const monthlyData = {};

  expenses.forEach((item) => {

    const month = item.date.substring(0, 7);

    if (!monthlyData[month]) {

      monthlyData[month] = {
        Income: 0,
        Expense: 0,
      };

    }

    if (item.type === "Income") {
      monthlyData[month].Income += Number(item.amount);
    } else {
      monthlyData[month].Expense += Number(item.amount);
    }

  });

  const barData = Object.keys(monthlyData).map((month) => ({
    month,
    Income: monthlyData[month].Income,
    Expense: monthlyData[month].Expense,
  }));

  const COLORS = [
    "#4CAF50",
    "#F44336",
  ];

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(420px,1fr))",
        gap: "25px",
        marginTop: "35px",
      }}
    >
          <div
        style={{
          background: "#ffffff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1976d2",
            marginBottom: "20px",
          }}
        >
          📊 Income vs Expense
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={60}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹ ${Number(value).toFixed(2)}`,
                "Amount",
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
            <div
        style={{
          background: "#ffffff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1976d2",
            marginBottom: "20px",
          }}
        >
          📈 Monthly Income vs Expense
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `₹ ${Number(value).toFixed(2)}`,
                "Amount",
              ]}
            />

            <Legend />

            <Bar
              dataKey="Income"
              fill="#4CAF50"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="Expense"
              fill="#F44336"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ExpenseCharts;