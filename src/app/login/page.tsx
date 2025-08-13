"use client";

import { FormEvent, useRef } from "react";

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      password: (
        e.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    };

    try {
      const res = await fetch("/api/loginForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        formRef.current?.reset();
        window.location.href = "/dasboard";
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-bl from-indigo-950 to-sky-800 flex items-center justify-center p-4">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 space-y-6 text-white"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Log In</h1>
          <p className="text-sm text-gray-300">
            Welcome back! Sign in to continue
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 font-semibold transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-300">
          New here?{" "}
          <a href="/signup" className="text-purple-400 hover:underline">
            Create an account
          </a>
        </p>
      </form>
    </main>
  );
}
