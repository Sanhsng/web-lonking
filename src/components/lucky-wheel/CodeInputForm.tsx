"use client";

import React, { useState } from "react";
import { checkLuckyCode } from "@/services/luckyDraw";

interface CodeInputFormProps {
  onValidCode: (code: string, customerName: string) => void;
}

export function CodeInputForm({ onValidCode }: CodeInputFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputCode = code.trim();
    if (!inputCode) {
      setError("Vui lòng nhập mã dự thưởng.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await checkLuckyCode(inputCode);

      if (response.success) {
        onValidCode(inputCode, response.customer || "Khách Hàng");
      } else {
        setError(response.message || "Mã không hợp lệ.");
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl w-full max-w-md mx-auto shadow-2xl">
      <h2 className="text-2xl font-black text-center text-yellow-400 uppercase mb-2">
        Nhập Mã Dự Thưởng
      </h2>
      <p className="text-yellow-100 text-center mb-6 text-sm">
        Nhập mã dự thưởng trên hóa đơn hoặc tin nhắn của bạn để bắt đầu quay thưởng.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="VD: 365-001"
            className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-transparent focus:border-yellow-400 focus:outline-none text-gray-800 font-bold tracking-wider placeholder:font-normal placeholder:text-gray-400 text-center text-xl transition-colors"
            disabled={isLoading}
          />
        </div>

        {error && (
          <p className="text-red-300 text-sm font-medium text-center bg-red-900/30 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-red-800 font-black uppercase tracking-wide rounded-xl shadow-lg transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <span className="animate-pulse">Đang kiểm tra...</span>
          ) : (
            "Kiểm Tra Mã"
          )}
        </button>
      </form>
    </div>
  );
}
