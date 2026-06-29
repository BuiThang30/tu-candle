import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// =============================================
// CẤU HÌNH - thay đổi các giá trị này
// =============================================
const CONFIG = {
  // Google Sheets
  SHEET_WEBHOOK_URL: process.env.GOOGLE_SHEET_WEBHOOK_URL || "",

  // Email người bán
  SELLER_EMAIL: process.env.SELLER_EMAIL || "shop@example.com",
  SELLER_NAME: "TU Candle",

  // SMTP (dùng Gmail)
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: 587,
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: (process.env.SMTP_PASS || "").replace(/\s/g, ""),
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

// Gửi dữ liệu vào Google Sheets
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

// Email gửi cho người bán
function sellerEmailHTML(order: OrderData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="border-bottom: 2px solid #111; padding-bottom: 12px;">Đơn hàng mới!</h2>
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
      <h2 style="font-weight: 700; font-size: 28px; border-bottom: 2px solid #111; padding-bottom: 12px; margin-bottom: 20px; margin-top: 0;">TỤ CANDLE</h2>
      <h2 style="font-weight: 700; font-size: 18px; border-bottom: 2px solid #111; padding-bottom: 12px; margin-bottom: 20px; margin-top: 0;">XÁC NHẬN ĐƠN HÀNG</h2>
      <p>Xin chào <strong>${order.ho} ${order.ten}</strong>,</p>
      <p>Cảm ơn bạn đã lựa chọn <strong>TỤ CANDLE</strong> 🕯🥰.</p>
      <p>Đơn hàng của bạn đã được tiếp nhận. Chúng tôi sẽ sớm liên hệ để xác nhận và chuẩn bị đơn hàng.</p>
      <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top:0; font-size:13px; letter-spacing: 0.1em;">CHI TIẾT ĐƠN HÀNG</h3>
        <table style="width:100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #666;">Sản phẩm</td><td>${order.sanPham} x ${order.soLuong}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Giao đến</td><td>${order.soNha}, ${order.phuong}, ${order.tinh}</td></tr>
          <tr style="border-top: 1px solid #ddd;"><td style="padding: 10px 0 0; font-weight: 700;">Tổng tiền</td><td style="padding: 10px 0 0; font-weight: 700; color: #e53935;">${formatVND(order.tongTien)}</td></tr>
        </table>
      </div>
      <p>Nếu cần hỗ trợ, bạn có thể phản hồi trực tiếp email này.</p>
      <br/>
      <p>Trân trọng,<br/><strong>TỤ CANDLE</strong></p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const order = await req.json() as OrderData;

    // 1. Lưu vào Google Sheets
    try {
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
      console.log("[Sheets] Lưu thành công");
    } catch (sheetErr) {
      console.error("[Sheets] Lỗi:", sheetErr);
    }

    // 2. Gửi email
    if (CONFIG.SMTP_USER && CONFIG.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: CONFIG.SMTP_USER,
          pass: CONFIG.SMTP_PASS,
        },
      });

      try {
        await transporter.verify();
        console.log("[SMTP] Kết nối thành công");
      } catch (verifyErr) {
        console.error("[SMTP] Lỗi kết nối:", verifyErr);
        throw new Error(
          "Không thể kết nối SMTP: " +
            (verifyErr instanceof Error ? verifyErr.message : String(verifyErr))
        );
      }

      const sellerText = `
    ĐƠN HÀNG MỚI

    Khách hàng: ${order.ho} ${order.ten}
    SĐT: ${order.soDienThoai}
    Email: ${order.email}

    Địa chỉ:
    ${order.soNha}, ${order.phuong}, ${order.tinh}

    Sản phẩm:
    ${order.sanPham} x ${order.soLuong}

    Tổng tiền:
    ${formatVND(order.tongTien)}

    Thời gian:
    ${new Date().toLocaleString("vi-VN")}
    `;

      const customerText = `
    Xin chào ${order.ho} ${order.ten},

    Cảm ơn bạn đã đặt hàng tại TỤ Candle.

    Thông tin đơn hàng:

    Sản phẩm: ${order.sanPham}
    Số lượng: ${order.soLuong}

    Địa chỉ giao hàng:
    ${order.soNha}, ${order.phuong}, ${order.tinh}

    Tổng tiền:
    ${formatVND(order.tongTien)}

    Chúng tôi sẽ sớm liên hệ để xác nhận đơn hàng.

    Trân trọng,
    TỤ Candle
    `;

      const [sellerResult, customerResult] = await Promise.allSettled([
        transporter.sendMail({
          from: `"TỤ Candle" <${CONFIG.SMTP_USER}>`,
          replyTo: CONFIG.SMTP_USER,
          to: CONFIG.SELLER_EMAIL,
          subject: `Đơn hàng mới từ ${order.ho} ${order.ten}`,
          text: sellerText,
          html: sellerEmailHTML(order),
          headers: { "X-Mailer": "TỤ Candle" },
        }),

        transporter.sendMail({
          from: `"TỤ Candle" <${CONFIG.SMTP_USER}>`,
          replyTo: CONFIG.SMTP_USER,
          to: order.email,
          subject: "TỤ Candle - Xác nhận đơn hàng",
          text: customerText,
          html: customerEmailHTML(order),
          headers: { "X-Mailer": "TỤ Candle" },
        }),
      ]);

      if (sellerResult.status === "fulfilled") {
        console.log("[Email] Gửi cho người bán thành công:", sellerResult.value.messageId);
      } else {
        console.error("[Email] Lỗi gửi cho người bán:", sellerResult.reason);
      }

      if (customerResult.status === "fulfilled") {
        console.log("[Email] Gửi cho khách hàng thành công:", customerResult.value.messageId);
      } else {
        console.error("[Email] Lỗi gửi cho khách hàng:", customerResult.reason);
      }
    } else {
      console.warn("[SMTP] Chưa cấu hình SMTP_USER hoặc SMTP_PASS, bỏ qua gửi email");
    }

    return NextResponse.json({ success: true, message: "Đặt hàng thành công" });
  } catch (err: unknown) {
    console.error("[Checkout] Lỗi:", err);
    const message = err instanceof Error ? err.message : "Lỗi server";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}