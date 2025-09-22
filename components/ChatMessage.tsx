export default function ChatMessage({ message }: any) {
  return (
    <div className="mb-2 p-2 bg-gray-200 rounded">
      <p className="text-sm">{message.content}</p>
      <span className="text-xs text-gray-500">
        {new Date(message.created_at).toLocaleTimeString()}
      </span>
    </div>
  );
}
