import { useState } from "react";
import { uploadReceipt } from "../services/ExpenseService";

function ExpenseList({
  expenses,
  deleteExpense,
  editExpense,
}) {

  const [uploadingId, setUploadingId] = useState(null);

  const handleReceiptUpload = async (expenseId, file) => {

    if (!file) return;

    try {

      setUploadingId(expenseId);

      await uploadReceipt(expenseId, file);

      alert("Receipt uploaded successfully!");

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert("Receipt upload failed.");

    } finally {

      setUploadingId(null);

    }
  };

  const openReceipt = (receipt) => {

    if (!receipt) {

      alert("Receipt not uploaded.");

      return;

    }

  window.open(
    `https://expense-tracker-backend-q5a1.onrender.com/uploads/${receipt}`,
    "_blank"
  );
};
  return (

    <div
      style={{
        marginTop: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
        padding: "20px",
        overflowX: "auto",
      }}
    >

      <h2
        style={{
          marginBottom: "20px",
          color: "#1976d2",
          fontSize: "28px",
        }}
      >
        All Transactions
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "1200px",
        }}
      >

        <thead>

          <tr
            style={{
              background: "#1976d2",
              color: "white",
            }}
          >

            <th style={thStyle}>Title</th>

            <th style={thStyle}>Type</th>

            <th style={thStyle}>Category</th>

            <th style={thStyle}>Amount</th>

            <th style={thStyle}>Date</th>

            <th style={thStyle}>Description</th>

            <th style={thStyle}>Receipt</th>

            <th style={thStyle}>Actions</th>

          </tr>

        </thead>

        <tbody>

          {expenses.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  fontSize: "18px",
                }}
              >
                No Expenses Found.
              </td>

            </tr>

          ) : (
expenses.map((expense) => (

<tr
  key={expense.id}
  style={{
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
  }}
>

  <td style={tdStyle}>
    {expense.title}
  </td>

  <td style={tdStyle}>
    <span
      style={{
        color:
          expense.type === "Income"
            ? "#2e7d32"
            : "#d32f2f",
        fontWeight: "bold",
        backgroundColor:
          expense.type === "Income"
            ? "#e8f5e9"
            : "#ffebee",
        padding: "6px 12px",
        borderRadius: "20px",
        display: "inline-block",
        minWidth: "80px",
      }}
    >
      {expense.type}
    </span>
  </td>

  <td style={tdStyle}>
    {expense.category}
  </td>

  <td
    style={{
      ...tdStyle,
      fontWeight: "bold",
      color:
        expense.type === "Income"
          ? "#2e7d32"
          : "#d32f2f",
    }}
  >
    ₹ {Number(expense.amount).toFixed(2)}
  </td>

  <td style={tdStyle}>
    {expense.date}
  </td>

  <td
    style={{
      ...tdStyle,
      maxWidth: "250px",
      wordBreak: "break-word",
    }}
  >
    {expense.description || "-"}
  </td>

  <td style={tdStyle}>

    <input
      type="file"
      accept="image/*,.pdf"
      onChange={(e) =>
        handleReceiptUpload(
          expense.id,
          e.target.files[0]
        )
      }
    />

    <br />
    <br />

    {uploadingId === expense.id ? (

      <span
        style={{
          color: "#1976d2",
          fontWeight: "bold",
        }}
      >
        Uploading...
      </span>

    ) : (

      <button
        style={viewButton}
        onClick={() =>
          openReceipt(expense.receipt)
        }
      >
        View Receipt
      </button>

    )}

  </td>

  <td style={tdStyle}>

    <button
      style={editButton}
      onClick={() => editExpense(expense)}
    >
      ✏ Edit
    </button>

    <button
      style={deleteButton}
      onClick={() => {
        if (
          window.confirm(
            `Are you sure you want to delete "${expense.title}"?`
          )
        ) {
          deleteExpense(expense.id);
        }
      }}
    >
      🗑 Delete
    </button>

  </td>

</tr>

))

          )}

        </tbody>

      </table>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#666",
          fontSize: "15px",
        }}
      >
        Total Records : <strong>{expenses.length}</strong>
      </div>

    </div>

  );

const thStyle = {
  padding: "14px",
  textAlign: "center",
  fontWeight: "bold",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  verticalAlign: "middle",
};
const editButton = {
  backgroundColor: "#1976d2",
  color: "#ffffff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
  fontWeight: "bold",
  transition: "0.3s",
};

const deleteButton = {
  backgroundColor: "#d32f2f",
  color: "#ffffff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
};

const viewButton = {
  backgroundColor: "#2e7d32",
  color: "#ffffff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "6px",
  transition: "0.3s",
};
};
export default ExpenseList;
