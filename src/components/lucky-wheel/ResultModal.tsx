"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prize } from "@/types/promotion";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  prize: Prize | null;
  customerName: string;
  code: string;
}

export function ResultModal({ isOpen, onClose, prize, customerName, code }: ResultModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !prize) return null;

  const isWin = prize.type !== "TRUOT";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border-4 border-yellow-400"
        >
          {/* Header */}
          <div className={`p-6 text-center ${isWin ? 'bg-gradient-to-r from-red-600 to-red-500' : 'bg-surface-container-highest'}`}>
            <h2 className={`text-2xl font-black uppercase ${isWin ? 'text-yellow-300' : 'text-on-surface'}`}>
              {isWin ? "Chúc Mừng Trúng Thưởng!" : "Opps... Rất Tiếc!"}
            </h2>
          </div>

          {/* Body */}
          <div className="p-8 text-center flex flex-col items-center">
            {isWin ? (
              <>
                {prize.image ? (
                  <div className="w-32 h-32 mb-4 flex items-center justify-center relative">
                    <img src={prize.image} alt={prize.name} className="object-contain w-full h-full drop-shadow-md" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-inner border border-yellow-300">
                    <span className="text-5xl">🎁</span>
                  </div>
                )}
                <p className="text-xl font-bold text-gray-800 uppercase text-balance mb-1">
                  {customerName}
                </p>
                <p className="text-sm text-gray-500 mb-4 font-mono">Mã: {code}</p>
                
                <div className="bg-red-50 rounded-xl px-6 py-4 w-full mb-4 border border-red-100">
                  <p className="text-sm text-red-800 font-medium mb-1">Đã quay trúng phần quà</p>
                  <p className="text-2xl font-black text-red-600 uppercase text-balance">
                    {prize.name}
                  </p>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                  Vui lòng liên hệ nhân viên để nhận thưởng.
                </p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <span className="text-5xl">😢</span>
                </div>
                <p className="text-xl font-bold text-gray-800 uppercase text-balance mb-1">
                  {customerName}
                </p>
                <p className="text-sm text-gray-500 mb-4 font-mono">Mã: {code}</p>

                <p className="text-on-surface-variant mb-2 font-medium">Kết quả của bạn:</p>
                <p className="text-2xl font-black text-on-surface uppercase text-balance">
                  {prize.name}
                </p>
                <p className="text-sm text-outline mt-4">
                  Chúc bạn may mắn lần sau nhé!
                </p>
              </>
            )}

            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-red-700 font-bold rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-1 active:translate-y-0 w-full"
            >
              Hoàn Tất
            </button>
          </div>
          
          {/* Festive particles for win */}
          {isWin && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               {[...Array(15)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ 
                     y: -50, 
                     x: Math.random() * 400,
                     rotate: 0,
                     scale: 0 
                   }}
                   animate={{ 
                     y: 400,
                     rotate: 360,
                     scale: Math.random() * 0.5 + 0.5
                   }}
                   transition={{ 
                     duration: Math.random() * 2 + 1.5,
                     repeat: Infinity,
                     ease: "linear",
                     delay: Math.random() * 2
                   }}
                   className="absolute w-3 h-3"
                   style={{
                     backgroundColor: ['#FFD700', '#FF0000', '#00FF00', '#0000FF'][Math.floor(Math.random() * 4)],
                     borderRadius: Math.random() > 0.5 ? '50%' : '0'
                   }}
                 />
               ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
