"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      toastOptions={{
        duration: 4500,
        style: {
          background: "#ffffff",
          color: "#102a43",
          border: "1px solid #dce6ef",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "0 14px 34px rgba(21, 59, 90, 0.16)",
          maxWidth: "420px",
        },
        success: {
          iconTheme: { primary: "#1c9b91", secondary: "#ffffff" },
        },
        error: {
          duration: 6000,
          iconTheme: { primary: "#d64545", secondary: "#ffffff" },
        },
        loading: {
          iconTheme: { primary: "#2864dc", secondary: "#e9f1ff" },
        },
      }}
    />
  );
}