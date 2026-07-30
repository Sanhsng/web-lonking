import { LuckyCode, LuckyResult } from "@/types/lucky-draw";

// MOCK DATABASE
export let DEMO_LUCKY_CODES: LuckyCode[] = [
  { id: "1", code: "365-000001", customerName: "Nguyễn Văn A", phone: "0901234567", status: "UNUSED" },
  { id: "2", code: "365-000002", customerName: "Trần Thị B", phone: "0912345678", status: "UNUSED" },
  { id: "3", code: "365-000003", customerName: "Lê Văn C", phone: "0923456789", status: "UNUSED" },
  { id: "4", code: "365-000004", customerName: "Phạm Thị D", phone: "0934567890", status: "UNUSED" },
  { id: "5", code: "365-000005", customerName: "Hoàng Văn E", phone: "0945678901", status: "UNUSED" },
];

export let DEMO_LUCKY_RESULTS: LuckyResult[] = [];

// Helper functions to simulate DB operations
export const getCode = (code: string) => DEMO_LUCKY_CODES.find((c) => c.code === code);

export const markCodeAsUsed = (codeStr: string) => {
  DEMO_LUCKY_CODES = DEMO_LUCKY_CODES.map((c) => 
    c.code === codeStr ? { ...c, status: "USED", usedAt: new Date().toISOString() } : c
  );
};

export const saveResult = (result: LuckyResult) => {
  DEMO_LUCKY_RESULTS.push(result);
};
