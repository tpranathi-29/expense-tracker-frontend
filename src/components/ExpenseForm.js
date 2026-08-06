import { useState, useEffect } from "react";

function ExpenseForm({
  addExpense,
  updateExpense,
  editingExpense,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("Expense");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || "");
      setAmount(editingExpense.amount || "");
      setCategory(editingExpense.category || "Food");
      setType(editingExpense.type || "Expense");
      setDescription(editingExpense.description || "");
      setDate(
        editingExpense.date ||
          new Date().toISOString().split("T")[0]
      );
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("Food");
    setType("Expense");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an expense title.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      const expense = {
        title,
        amount: Number(amount),
        category,
        type,
        description,
        date,
      };

      if (editingExpense) {
        await updateExpense({
          ...expense,
          id: editingExpense.id,
        });
      } else {
        await addExpense(expense);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#1976d2",
          marginBottom: "25px",
        }}
      >
        {editingExpense
          ? "✏️ Update Expense"
          : "➕ Add New Expense"}
      </h2>

      <form onSubmit={handleSubmit}>
              <input
          type="text"
          placeholder="Enter Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="Food">🍔 Food</option>
            <option value="Travel">✈️ Travel</option>
            <option value="Shopping">🛍 Shopping</option>
            <option value="Bills">💡 Bills</option>
            <option value="Health">🏥 Health</option>
            <option value="Education">📚 Education</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Salary">💰 Salary</option>
            <option value="Investment">📈 Investment</option>
            <option value="Other">📦 Other</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <textarea
          rows="4"
          placeholder="Enter Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: "100px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "25px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading
              ? editingExpense
                ? "Updating..."
                : "Adding..."
              : editingExpense
              ? "Update Expense"
              : "Add Expense"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            style={resetButtonStyle}
          >
            Reset
          </button>
        </div>
              </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "12px 30px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "0.3s",
};

const resetButtonStyle = {
  backgroundColor: "#757575",
  color: "#fff",
  border: "none",
  padding: "12px 30px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "0.3s",
};

export default ExpenseForm;