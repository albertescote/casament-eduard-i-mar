"use client";

import { getDictionary } from "@/i18n/getDictionary";
import { useState } from "react";

export function PasswordBlockerScreen({
  t,
}: {
  t: ReturnType<typeof getDictionary>;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else if (res.status === 401) {
      setError(t.enter.invalidPassword);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Error");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "40px 0",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "40px 32px",
          background: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: 16,
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.03)",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            marginBottom: 28,
            textAlign: "center",
            fontWeight: 600,
            color: "#171717",
            letterSpacing: "-0.025em",
          }}
        >
          {t.enter.enterPassword}
        </h1>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.enter.passwordPlaceholder}
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              paddingRight: "48px",
              border: "1px solid #d4d4d4",
              borderRadius: 10,
              fontSize: 15,
              transition: "all 0.2s ease",
              outline: "none",
              boxSizing: "border-box",
              color: "#171717",
              backgroundColor: "#fafafa",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#737373";
              e.target.style.backgroundColor = "#ffffff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d4d4d4";
              e.target.style.backgroundColor = "#fafafa";
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#737373",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
              height: "24px",
              width: "24px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#171717";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#737373";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>
        <button
          type="submit"
          style={{
            marginTop: 16,
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "none",
            background: "#171717",
            color: "#ffffff",
            fontWeight: 500,
            fontSize: 15,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#404040";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#171717";
          }}
        >
          {t.enter.submit}
        </button>
        {error ? (
          <p
            style={{
              color: "#dc2626",
              marginTop: 14,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
