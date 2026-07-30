"use client";

import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useSearchParams } from "next/navigation";

export function ContactForm({ productOptions = [] }: { productOptions?: { value: string, label: string }[] }) {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: initialProduct,
    message: "",
    quote: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.product) newErrors.product = "Vui lòng chọn sản phẩm quan tâm";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập tin nhắn";

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Địa chỉ email không hợp lệ";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const productName = document.querySelector(`option[value="${formData.product}"]`)?.textContent || formData.product;

    const content = `[TỪ WEBSITE] YÊU CẦU LIÊN HỆ
- Họ và tên: ${formData.name}
- Số điện thoại: ${formData.phone}
${formData.email ? `- Email: ${formData.email}\n` : ""}${formData.company ? `- Công ty: ${formData.company}\n` : ""}- Sản phẩm quan tâm: ${productName}
- Yêu cầu báo giá: ${formData.quote ? "Có" : "Không"}
- Lời nhắn: ${formData.message}`;

    navigator.clipboard.writeText(content).then(() => {
      alert("Đã sao chép nội dung yêu cầu.\nHệ thống sẽ mở Zalo, vui lòng [Dán] (Paste) nội dung vào khung chat để gửi nhé!");
      window.open(`https://zalo.me/${siteConfig.hotline}`, "_blank");
    }).catch(() => {
      alert("Đang mở Zalo, bạn hãy nhắn tin trực tiếp cho chúng tôi nhé!");
      window.open(`https://zalo.me/${siteConfig.hotline}`, "_blank");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-semibold"
            htmlFor="name"
          >
            Họ và tên *
          </label>
          <input
            className={`w-full bg-surface-container-low border focus:bg-surface-container-lowest focus:ring-2 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface transition-colors outline-none ${errors.name ? 'border-error focus:border-error focus:ring-error' : 'border-transparent focus:border-primary focus:ring-primary'}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            type="text"
          />
          {errors.name && <p className="text-error text-label-sm mt-1">{errors.name}</p>}
        </div>
        {/* Company */}
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-semibold"
            htmlFor="company"
          >
            Công ty
          </label>
          <input
            className="w-full bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface transition-colors outline-none"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Xây dựng Acme"
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-semibold"
            htmlFor="email"
          >
            Địa chỉ Email
          </label>
          <input
            className={`w-full bg-surface-container-low border focus:bg-surface-container-lowest focus:ring-2 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface transition-colors outline-none ${errors.email ? 'border-error focus:border-error focus:ring-error' : 'border-transparent focus:border-primary focus:ring-primary'}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nguyenvana@example.com"
            type="text"
          />
          {errors.email && <p className="text-error text-label-sm mt-1">{errors.email}</p>}
        </div>
        {/* Phone */}
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-semibold"
            htmlFor="phone"
          >
            Số điện thoại *
          </label>
          <input
            className={`w-full bg-surface-container-low border focus:bg-surface-container-lowest focus:ring-2 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface transition-colors outline-none ${errors.phone ? 'border-error focus:border-error focus:ring-error' : 'border-transparent focus:border-primary focus:ring-primary'}`}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+84 900 000 000"
            type="tel"
          />
          {errors.phone && <p className="text-error text-label-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
      {/* Product */}
      <div>
        <label
          className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-semibold"
          htmlFor="product"
        >
          Sản phẩm quan tâm *
        </label>
        <div className="relative">
          <select
            className={`w-full bg-surface-container-low border focus:bg-surface-container-lowest focus:ring-2 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface transition-colors outline-none cursor-pointer appearance-none ${errors.product ? 'border-error focus:border-error focus:ring-error' : 'border-transparent focus:border-primary focus:ring-primary'}`}
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
          >
            <option value="" disabled>-- Chọn sản phẩm --</option>
            {productOptions.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
            <option value="other">Sản phẩm khác / Chưa quyết định</option>
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        {errors.product && <p className="text-error text-label-sm mt-1">{errors.product}</p>}
      </div>
      {/* Message */}
      <div>
        <label
          className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-semibold"
          htmlFor="message"
        >
          Tin nhắn *
        </label>
        <textarea
          className={`w-full bg-surface-container-low border focus:bg-surface-container-lowest focus:ring-2 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface transition-colors resize-none outline-none ${errors.message ? 'border-error focus:border-error focus:ring-error' : 'border-transparent focus:border-primary focus:ring-primary'}`}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Chúng tôi có thể giúp bạn kiến tạo tương lai như thế nào?"
          rows={5}
        ></textarea>
        {errors.message && <p className="text-error text-label-sm mt-1">{errors.message}</p>}
      </div>
      {/* Checkbox */}
      <div className="flex items-center py-2">
        <input
          className="h-5 w-5 rounded border-outline text-primary focus:ring-primary focus:ring-2 bg-surface-container-low cursor-pointer"
          id="quote"
          name="quote"
          checked={formData.quote}
          onChange={handleChange}
          type="checkbox"
        />
        <label
          className="ml-3 font-body-md text-body-md text-on-surface cursor-pointer select-none"
          htmlFor="quote"
        >
          Tôi muốn yêu cầu một báo giá chính thức
        </label>
      </div>
      {/* Submit CTA */}
      <button
        className="w-full md:w-auto bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-all duration-300 rounded-[16px] px-8 py-4 font-label-md text-label-md hover:scale-[0.98] shadow-sm flex items-center justify-center space-x-2 font-bold"
        type="submit"
      >
        <span>Gửi tin nhắn</span>
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
