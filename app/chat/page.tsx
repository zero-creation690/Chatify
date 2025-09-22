"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ChatMessage from "../../components/ChatMessage";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };

    fetchMessages();

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleSend = async () => {
    if (!newMessage) return;
    const user = supabase.auth.getUser();
    if (!user) return alert("Please login");
    await supabase
      .from("messages")
      .insert([{ user_id: (await user).data.user?.id, content: newMessage }]);
    setNewMessage("");
  };

  // Filter messages older than 6 hours
  const filteredMessages = messages.filter(
    (msg) => new Date(msg.created_at).getTime() > Date.now() - 6 * 60 * 60 * 1000
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Chat Room</h1>
      <div className="border rounded p-2 h-96 overflow-y-scroll mb-4">
        {filteredMessages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={handleSend}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
