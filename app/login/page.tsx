"use client";

import { login } from "@/lib/actions/auth";
import { useState } from "react";
import Button from "@/components/shared/Button";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="glass-dark p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-primary-500" size={28} />
        </div>
        <h1 className="text-3xl font-display mb-2">Staff Login</h1>
        <p className="text-white/40 text-sm mb-8 italic">Enter password to access dashboard</p>

        <form action={handleSubmit} className="space-y-4">
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-center tracking-widest outline-none focus:border-primary-500/50 transition-all"
          />
          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-tighter">{error}</p>}
          <Button type="submit" className="w-full py-4">Access Dashboard</Button>
        </form>
      </div>
    </div>
  );
}