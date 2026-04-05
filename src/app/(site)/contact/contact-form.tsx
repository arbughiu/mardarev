"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="border-accent/20 flex items-center justify-center border p-12">
        <div className="text-center">
          <p className="text-2xl font-semibold">Mulțumim!</p>
          <p className="text-muted mt-2">
            Am primit mesajul dumneavoastră. Vă vom contacta în cel mai scurt
            timp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
          const res = await fetch("/api/contact-forms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              projectType: formData.get("type"),
              message: formData.get("message"),
            }),
          });

          if (!res.ok) {
            throw new Error("A apărut o eroare. Vă rugăm încercați din nou.");
          }

          setSubmitted(true);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "A apărut o eroare. Vă rugăm încercați din nou.",
          );
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-6"
    >
      {error && (
        <div className="border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-muted block text-sm">
            Nume complet
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="focus:border-accent mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm transition-colors outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-muted block text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="focus:border-accent mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm transition-colors outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="text-muted block text-sm">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="focus:border-accent mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm transition-colors outline-none"
        />
      </div>
      <div>
        <label htmlFor="type" className="text-muted block text-sm">
          Tip proiect
        </label>
        <select
          id="type"
          name="type"
          className="bg-surface focus:border-accent mt-2 w-full border border-white/10 px-4 py-3 text-sm transition-colors outline-none"
        >
          <option value="">Selectați...</option>
          <option value="rezidential">Rezidențial</option>
          <option value="comercial">Comercial</option>
          <option value="interior">Design Interior</option>
          <option value="peisagistica">Peisagistică</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-muted block text-sm">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="focus:border-accent mt-2 w-full resize-none border border-white/10 bg-transparent px-4 py-3 text-sm transition-colors outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-accent hover:bg-accent-hover px-8 py-3 text-sm font-medium text-black transition-colors disabled:opacity-50"
      >
        {loading ? "Se trimite..." : "Trimite mesajul"}
      </button>
    </form>
  );
}
