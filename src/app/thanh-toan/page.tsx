"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./thanhtoan.module.css";
import Navbar from "../../components/Nav/nav";
import Footer from "@/components/Footer/Footer";

const SHIPPING = 30000;
const PRICE = 295000;

function CheckoutForm() {
  const searchParams = useSearchParams();
  const qty = parseInt(searchParams.get("qty") || "1", 10);
  const productName = searchParams.get("name") || "Sản phẩm";
  const productImage = searchParams.get("image") || "/product.png";

  const [form, setForm] = useState({
    ho: "",
    ten: "",
    soDienThoai: "",
    tinh: "",
    phuong: "",
    soNha: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const subtotal = PRICE * qty;
  const total = subtotal + SHIPPING;

  const formatVND = (n: number) =>
    n.toLocaleString("vi-VN") + "vnđ";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { ho, ten, soDienThoai, tinh, phuong, soNha, email } = form;
    if (!ho || !ten || !soDienThoai || !tinh || !phuong || !soNha || !email) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ho,
          ten,
          soDienThoai,
          tinh,
          phuong,
          soNha,
          email,
          soLuong: qty,
          sanPham: productName,
          tongTien: total,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Có lỗi xảy ra");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successBox}>
        <div className={styles.successIcon}>✓</div>
        <h2>Đặt hàng thành công!</h2>
        <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận qua email <strong>{form.email}</strong> trong thời gian sớm nhất.</p>
        <Link href="/" className={styles.backBtn}>Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {/* LEFT: Billing & Shipping */}
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>BILLING &amp; SHIPPING</h2>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Họ <span className={styles.required}>*</span></label>
            <input
              className={styles.input}
              name="ho"
              value={form.ho}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tên <span className={styles.required}>*</span></label>
            <input
              className={styles.input}
              name="ten"
              value={form.ten}
              onChange={handleChange}
              placeholder=""
            />
          </div>
        </div>

        <div className={styles.fieldFull}>
          <label className={styles.label}>Số điện thoại <span className={styles.required}>*</span></label>
          <input
            className={styles.input}
            name="soDienThoai"
            value={form.soDienThoai}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className={styles.fieldFull}>
          <label className={styles.label}>Tỉnh <span className={styles.required}>*</span></label>
          <input
            className={styles.input}
            name="tinh"
            value={form.tinh}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className={styles.fieldFull}>
          <label className={styles.label}>Phường <span className={styles.required}>*</span></label>
          <input
            className={styles.input}
            name="phuong"
            value={form.phuong}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className={styles.fieldFull}>
          <label className={styles.label}>
            Số nhà <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            name="soNha"
            value={form.soNha}
            onChange={handleChange}
          />
        </div>

        <div className={styles.fieldFull}>
          <label className={styles.label}>Email <span className={styles.required}>*</span></label>
          <input
            className={styles.input}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <p className={styles.shippingNote}>
          Please note: Worldwide shipping available upon request!
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.paymentSection}>
          <h2 className={styles.paymentTitle}>PAYMENT</h2>

          <p className={styles.paymentDesc}>
            Xin vui lòng hoàn tất thanh toán trước để chúng tôi tiến hành đóng gói
            và chuyển phát đơn hàng đến Quý khách.
          </p>

          <div className={styles.bankInfo}>
            <p><strong>Ngân hàng:</strong> Techcombank</p>
            <p><strong>Người nhận:</strong> NGUYENTHANHPHONG</p>
            <p><strong>Số tài khoản:</strong> 8005766688</p>
            <p>
              <strong>Nội dung chuyển khoản:</strong> Vui lòng để nội dung chuyển
              khoản mặc định
            </p>
          </div>
        </div>
      </div>



      {/* RIGHT: Order Summary */}
      <div className={styles.orderSection}>
        <h2 className={styles.sectionTitle}>YOUR ORDER</h2>

        <div className={styles.orderCard}>
          <div className={styles.orderItem}>
            <Image src={productImage} alt={productName} width={52} height={52} className={styles.productImg} />
            <div className={styles.productInfo}>
              <span className={styles.productName}>{productName} x {qty}</span>
            </div>
            <span className={styles.productPrice}>{formatVND(subtotal)}</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.orderRow}>
            <span>Shipping</span>
            <span>{formatVND(SHIPPING)}</span>
          </div>
          <div className={styles.orderRow}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalAmount}>{formatVND(total)}</span>
          </div>

          <button
            className={styles.orderBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ThanhToanPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar theme={0} />
      <div className={styles.main}>
        <Suspense fallback={<div>Đang tải...</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
}