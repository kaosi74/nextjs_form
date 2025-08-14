"use client";

import clsx from "clsx";
import { FormEvent, useRef, useState } from "react";
import { robo } from "./ui/font";

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading]= useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      username: (
        e.currentTarget.elements.namedItem("username") as HTMLInputElement
      ).value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      password: (
        e.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
    };
    try {
      const res = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        formRef.current?.reset();
        window.location.href = "/login";
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Submission failed");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-foreground flex items-center justify-center p-4">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-foreground text-background rounded-xl shadow-1xl p-6 space-y-6"
      >
        <div className="text-center space-y-1">
          <h1
            className={clsx(
              "text-2xl font-semibold",
              robo.className
            )}
          >
            Sign Up
          </h1>
          <p className="text-sm">
            Create your account to get started
          </p>
        </div>

        <div>
          <label htmlFor="username" className="block mb-1 text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            placeholder="e.g. janedoe"
            className="w-full px-4 py-2 rounded-md text-white bg-slate-800 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-btn-bg text-btn-text w-full py-2 rounded-md hover:bg-btn-text hover:text-btn-bg font-semibold transition"
          disabled={loading}
        >
          { loading ? 'Signing in...' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}
