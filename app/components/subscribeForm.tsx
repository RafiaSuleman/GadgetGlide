
"use client";

import { useState, type FormEvent } from "react";
type SubscribeFormProps = {
  onSubscribe?: (email: string) => Promise<void> | void;
};

export default function SubscribeForm({
  onSubscribe,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!onSubscribe) {
      setMessage("Subscription service abhi connect nahi hai.");
      return;
    }

    try {
      setLoading(true);
      await onSubscribe(email.trim());
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg font-bold text-sm transition"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p role="status" className="mt-2 text-sm text-gray-300">
          {message}
        </p>
      )}
    </div>
  );
}
