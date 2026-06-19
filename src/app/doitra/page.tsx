"use client";

import Navbar from "../../components/Nav/nav";
import styles from "./doitra.module.css";
import Footer from "@/components/Footer/Footer";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar theme={0} />
      <div className={styles.main}>
        <div className={styles.container}>
          <p className={styles.heading}>
            Trong trường hợp bạn muốn đổi hoặc trả sản phẩm, chúng tôi luôn sẵn sàng hỗ trợ.
          </p>

          <p className={styles.body}>
            Vui lòng đảm bảo sản phẩm gửi trả vẫn còn nguyên vẹn, không bị hư
            hỏng và giữ đúng tình trạng ban đầu khi nhận hàng.
            <br />
            Bạn có thể liên hệ với chúng tôi qua email{" "}
            <a className={styles.link} href="mailto:tu.candle.vn@gmail.com">
              TU.CANDLE.VN@GMAIL.COM
            </a>{" "}
            để nhận địa chỉ gửi trả. Sau đó, vui lòng đóng gói sản phẩm trong
            bao bì gốc và gửi lại bằng đơn vị vận chuyển mà bạn lựa chọn. Chi
            phí vận chuyển đổi/trả sẽ do khách hàng chi trả.
            <br/>
            Nếu bạn nhận được sản phẩm bị lỗi, hư hỏng hoặc không đúng với đơn
            hàng, vui lòng liên hệ với chúng tôi qua{" "}
            <a className={styles.link} href="mailto:tu.candle.vn@gmail.com">
              TU.CANDLE.VN@GMAIL.COM
            </a>{" "}
            và cung cấp đầy đủ thông tin kèm hình ảnh sản phẩm để được hỗ trợ
            nhanh nhất.
          </p>

          <div className={styles.divider} />

          <p className={styles.body}>
            Đừng ngần ngại liên hệ nếu bạn có bất kỳ câu hỏi nào — Chúng tôi
            luôn ở đây để hỗ trợ bạn.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}