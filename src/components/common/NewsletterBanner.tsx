import React from "react";

export function NewsletterBanner() {
  return (
    <section className="relative rounded-2xl overflow-hidden mb-section-padding-lg">
      <div className="absolute inset-0 bg-primary z-0">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_JyioVfIT3qDRxFb5nAdu6HmqjFr5csbWUpkZC7MOrEf1ea7imRwLqWrLoTHUW3_swuRdWLce5i_Nu8GkkIO4EVEYt88jVgX8660MjYPtuFNeKg48pqADeFhfJZWuq888fBbGdka2ve63jqlEj7qmGxG2Tckg5yE0cwvyxBiAiscEWnRPzWlFXHvQukDlVGSW-pXpVrazawLF14slsHLha8ZoaQUuCdZzM4FOGRR2x5bHYxuJ7ExRlVoHuJJ0oB__IyxqeboOMlc")',
          }}
        ></div>
      </div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/30 m-4 md:m-8 rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 text-white shadow-lg">
        <div className="max-w-xl text-center lg:text-left">
          <h3 className="font-headline-lg text-headline-lg mb-2 font-bold">
            Luôn đi trước đón đầu
          </h3>
          <p className="font-body-md text-body-md text-white/80">
            Đăng ký nhận bản tin hàng tháng của chúng tôi để cập nhật những
            hiểu biết mới nhất về ngành, ra mắt sản phẩm và lời khuyên kỹ
            thuật từ chuyên gia được gửi thẳng đến hộp thư đến của bạn.
          </p>
        </div>
        <form className="flex flex-col w-full max-w-[420px] lg:max-w-none lg:w-auto gap-3 sm:gap-4 lg:flex-row mx-auto lg:mx-0">
          <input
            className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 sm:py-3.5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-secondary-container w-full lg:w-[300px]"
            placeholder="Địa chỉ email doanh nghiệp"
            type="email"
          />
          <button
            className="bg-secondary-container text-on-secondary-container font-semibold text-label-md px-6 py-3 sm:py-3.5 rounded-lg hover:bg-secondary-fixed transition-colors whitespace-nowrap w-full lg:w-auto text-center"
            type="button"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
}
