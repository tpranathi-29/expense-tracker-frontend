import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCards from "../components/SummaryCards";
import ExpenseCharts from "../components/ExpenseCharts";

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  downloadPdfReport,
} from "../services/ExpenseService";

function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [dateFilter, setDateFilter] = useState("");

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0,
  });

  const fetchExpenses = async () => {

    setLoading(true);

    try {

      const response = await getExpenses();

      const data = response.data;

      setExpenses(data);

      const income = data
        .filter(item => item.type === "Income")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const expense = data
        .filter(item => item.type === "Expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      setSummary({

        totalIncome: income,

        totalExpense: expense,

        balance: income - expense,

        totalTransactions: data.length,

      });

      setError("");

    } catch (err) {

      console.error(err);

      setError("Unable to load expenses.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchExpenses();

  }, []);

  const handleAddExpense = async (expense) => {

    try {

      await addExpense(expense);

      fetchExpenses();

    } catch (err) {

      console.error(err);

      setError("Unable to add expense.");

    }
  };

  const handleUpdateExpense = async (expense) => {

    try {

      await updateExpense(expense.id, expense);

      setEditingExpense(null);

      fetchExpenses();

    } catch (err) {

      console.error(err);

      setError("Unable to update expense.");

    }
  };

  const handleDeleteExpense = async (id) => {

    try {

      await deleteExpense(id);

      fetchExpenses();

    } catch (err) {

      console.error(err);

      setError("Unable to delete expense.");

    }
  };
    const handleDownloadPDF = async () => {

    try {

      const response = await downloadPdfReport();

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Expense_Report.pdf"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {

      console.error(err);

      alert("Unable to download PDF report.");

    }

  };

  // ============================
  // Filter Expenses
  // ============================

  const filteredExpenses = expenses.filter((expense) => {
    const keyword = (search || "").toString().trim().toLowerCase();
    const title = (expense?.title || "").toString().trim().toLowerCase();
    const category = (expense?.category || "").toString().trim().toLowerCase();
    const description = (expense?.description || "").toString().trim().toLowerCase();

    const matchesSearch =
      !keyword ||
      title.includes(keyword) ||
      category.includes(keyword) ||
      description.includes(keyword);

    const matchesCategory =
      categoryFilter === "All"
        ? true
        : (expense?.category || "") === categoryFilter;

    const matchesDate =
      !dateFilter ||
      (expense?.date || "") === dateFilter;

    return matchesSearch && matchesCategory && matchesDate;
  });

  const categories = [

    "All",

    ...new Set(
      expenses.map((expense) => expense.category)
    ),

  ];

  return (

    <div
      style={{
        width: "95%",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >

      <Navbar />

      <h1
        style={{
          textAlign: "center",
          color: "#1976d2",
          marginBottom: "20px",
        }}
      >
        Expense Tracker Dashboard
      </h1>

      <SummaryCards summary={summary} />

      <ExpenseCharts expenses={filteredExpenses} />

      {error && (

        <p
          style={{
            color: "red",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>

      )}

      <ExpenseForm
        addExpense={handleAddExpense}
        updateExpense={handleUpdateExpense}
        editingExpense={editingExpense}
      />
<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "25px",
    marginBottom: "25px",
  }}
>
    
              <input
          type="text"
          placeholder="🔍 Search by title, category or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1",
            minWidth: "260px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "180px",
            fontSize: "15px",
          }}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "180px",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleDownloadPDF}
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          📄 Download PDF Report
        </button>

      </div>
      {loading ? (

        <h2
          style={{
            textAlign: "center",
            color: "#1976d2",
            marginTop: "40px",
          }}
        >
          Loading Expenses...
        </h2>

      ) : filteredExpenses.length === 0 ? (

        <h2
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: "40px",
          }}
        >
          No matching expenses found.
        </h2>

      ) : (

        <ExpenseList
          expenses={filteredExpenses}
          deleteExpense={handleDeleteExpense}
          editExpense={setEditingExpense}
        />

      )}

    </div>

  );
}

export default Dashboard;