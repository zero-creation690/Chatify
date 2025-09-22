"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    const ctx = canvas.getContext("2d")!;
    let x = 50;
    let dx = 2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.fillRect(x, 50, 50, 50);
      x += dx;
      if (x > canvas.width - 50 || x < 0) dx = -dx;
      requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <canvas ref={canvasRef} className="border mb-4" />
      <Link href="/chat" className="px-4 py-2 bg-blue-500 text-white rounded">
        Go to Chat
      </Link>
    </div>
  );
}
