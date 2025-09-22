"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    router.push("/chat");
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    alert("Check your email to confirm");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <div className="flex gap-2">
        <button onClick={handleLogin} className="px-4 py-1 bg-blue-500 text-white rounded">
          Login
        </button>
        <button onClick={handleSignup} className="px-4 py-1 bg-green-500 text-white rounded">
          Signup
        </button>
      </div>
    </div>
  );
}
