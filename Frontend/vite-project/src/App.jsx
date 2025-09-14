import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

function App() {
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Excel file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" })
        .map((item) => item.A)
        .filter(
          (val) =>
            typeof val === "string" &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
        );
      setEmails(emailList);
    };

    reader.readAsBinaryString(file);
  };

  // Sending bulk mail
  const handleSend = async () => {
    if (emails.length === 0 || !subject || !message) {
      setStatus("⚠️ Please fill all fields and upload emails");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post(
        "https://bulk-mail-backend-g0pe.onrender.com/sendemail", // ✅ use your backend
        {
          emailList: emails,
          subject: subject,
          msg: message,
        }
      );

      if (res.data === true || res.data.success) {
        setStatus("✅ Emails sent successfully!");
      } else {
        setStatus("❌ Failed to send emails");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          📧 Bulk Mail Sender
        </h1>

        {/* File Upload */}
        <div>
          <label className="block mb-2 font-medium">
            Upload Email Excel File:
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-2 font-medium">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Enter subject"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 font-medium">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className="w-full border rounded-lg p-2"
            placeholder="Enter your message"
          ></textarea>
        </div>

        {/* Email Preview */}
        <div>
          <h2 className="font-semibold mb-2">
            Email Preview ({emails.length}):
          </h2>
          <div className="h-32 overflow-y-auto border rounded-lg p-2 text-sm bg-gray-50">
            {emails.map((email, index) => (
              <div key={index} className="py-1 border-b last:border-none">
                <span className="font-medium">{index + 1}.</span> {email}
              </div>
            ))}
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "⏳ Sending..." : "🚀 Send Bulk Mail"}
        </button>

        {/* Status */}
        {status && (
          <div className="text-center font-medium text-gray-700 mt-3">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
