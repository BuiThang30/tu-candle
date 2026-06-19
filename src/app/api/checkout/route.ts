import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// =============================================
// CẤU HÌNH - thay đổi các giá trị này
// =============================================
const CONFIG = {
  // Google Sheets
  SHEET_WEBHOOK_URL: process.env.GOOGLE_SHEET_WEBHOOK_URL || "", // URL từ Google Apps Script

  // Email người bán
  SELLER_EMAIL: process.env.SELLER_EMAIL || "shop@example.com",
  SELLER_NAME: "TU Shop",

  // SMTP (dùng Gmail)
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: 587,
  SMTP_USER: process.env.SMTP_USER || "",       // Gmail của bạn
  SMTP_PASS: process.env.SMTP_PASS || "",       // App Password của Gmail
};

// Format tiền VND
function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + " vnđ";
}

// Type cho dữ liệu đơn hàng
interface OrderData {
  ho: string;
  ten: string;
  soDienThoai: string;
  email: string;
  tinh: string;
  phuong: string;
  soNha: string;
  sanPham: string;
  soLuong: number;
  tongTien: number;
}

// Gửi dữ liệu vào Google Sheets qua Apps Script webhook
async function saveToGoogleSheet(data: Record<string, string | number>) {
  if (!CONFIG.SHEET_WEBHOOK_URL) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL chưa được cấu hình");
    return;
  }
  const res = await fetch(CONFIG.SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Không thể lưu vào Google Sheets");
  }
}

// Tạo transporter email
function createTransporter() {
  return nodemailer.createTransport({
    host: CONFIG.SMTP_HOST,
    port: CONFIG.SMTP_PORT,
    secure: false,
    auth: {
      user: CONFIG.SMTP_USER,
      pass: CONFIG.SMTP_PASS,
    },
  });
}

// Email gửi cho người bán
function sellerEmailHTML(order: OrderData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="border-bottom: 2px solid #111; padding-bottom: 12px;">🛒 Đơn hàng mới!</h2>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #666;">Họ tên</td><td><strong>${order.ho} ${order.ten}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">SĐT</td><td>${order.soDienThoai}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Email</td><td>${order.email}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Địa chỉ</td><td>${order.soNha}, ${order.phuong}, ${order.tinh}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Sản phẩm</td><td>${order.sanPham} x ${order.soLuong}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Tổng tiền</td><td><strong style="color:#e53935">${formatVND(order.tongTien)}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Thời gian</td><td>${new Date().toLocaleString("vi-VN")}</td></tr>
      </table>
    </div>
  `;
}

// Email xác nhận gửi cho khách hàng
function customerEmailHTML(order: OrderData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -1px; margin-bottom: 4px;">TU</h1>
      <h2 style="border-bottom: 2px solid #111; padding-bottom: 12px;">Xác nhận đơn hàng</h2>
      <p>Xin chào <strong>${order.ho} ${order.ten}</strong>,</p>
      <p>Cảm ơn bạn đã đặt hàng tại TU. Chúng tôi đã nhận được đơn hàng của bạn và sẽ sớm liên hệ để xác nhận.</p>
      <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top:0; font-size:13px; letter-spacing: 0.1em;">CHI TIẾT ĐƠN HÀNG</h3>
        <table style="width:100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #666;">Sản phẩm</td><td>${order.sanPham} x ${order.soLuong}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Giao đến</td><td>${order.soNha}, ${order.phuong}, ${order.tinh}</td></tr>
          <tr style="border-top: 1px solid #ddd;"><td style="padding: 10px 0 0; font-weight: 700;">Tổng tiền</td><td style="padding: 10px 0 0; font-weight: 700; color: #e53935;">${formatVND(order.tongTien)}</td></tr>
        </table>
      </div>
      <p style="color: #666; font-size: 13px;">Nếu có thắc mắc, vui lòng liên hệ qua email này hoặc gọi cho chúng tôi.</p>
      <p style="color: #666; font-size: 13px;">Trân trọng,<br/><strong>TU Shop</strong></p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const order = await req.json() as OrderData;

    // 1. Lưu vào Google Sheets
    await saveToGoogleSheet({
      thoiGian: new Date().toLocaleString("vi-VN"),
      ho: order.ho,
      ten: order.ten,
      soDienThoai: order.soDienThoai,
      email: order.email,
      tinh: order.tinh,
      phuong: order.phuong,
      soNha: order.soNha,
      sanPham: order.sanPham,
      soLuong: order.soLuong,
      tongTien: order.tongTien,
    });

    // 2. Gửi email
    if (CONFIG.SMTP_USER && CONFIG.SMTP_PASS) {
      const transporter = createTransporter();

      await Promise.all([
        // Email cho người bán
        transporter.sendMail({
          from: `"TU Shop" <${CONFIG.SMTP_USER}>`,
          to: CONFIG.SELLER_EMAIL,
          subject: `🛒 Đơn hàng mới - ${order.ho} ${order.ten}`,
          html: sellerEmailHTML(order),
        }),
        // Email xác nhận cho khách hàng
        transporter.sendMail({
          from: `"TU Shop" <${CONFIG.SMTP_USER}>`,
          to: order.email,
          subject: "Xác nhận đơn hàng từ TU",
          html: customerEmailHTML(order),
        }),
      ]);
    } else {
      console.warn("SMTP chưa được cấu hình, bỏ qua gửi email");
    }

    return NextResponse.json({ success: true, message: "Đặt hàng thành công" });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Lỗi server";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}