# Hướng dẫn thiết lập Cache WPGraphQL (vượt bot InfinityFree)

Vì InfinityFree chặn các truy cập API tự động bằng trình kiểm tra trình duyệt (JS challenge + `__test` cookie), Next.js Server Components không thể gọi GraphQL trực tiếp. Cơ chế caching này sử dụng **GitHub Actions** và **Playwright** (Chromium) để đóng giả làm trình duyệt người dùng, lấy dữ liệu về và lưu vào **Upstash Redis**. Sau đó, Next.js sẽ đọc dữ liệu trực tiếp từ Redis.

## Yêu cầu
1. Một tài khoản [Upstash Redis](https://upstash.com) (Miễn phí).
2. Tạo 1 database trên Upstash.

## Các biến môi trường cần thiết
Bạn cần lấy URL và Token của Upstash REST API.
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Ngoài ra cần đảm bảo 2 biến môi trường WordPress vẫn tồn tại:
- `NEXT_PUBLIC_WORDPRESS_URL`
- `WORDPRESS_GRAPHQL_ENDPOINT`

## 1. Thiết lập trên GitHub (Để chạy Script tự động)
1. Vào Repo GitHub của bạn > **Settings** > **Secrets and variables** > **Actions**.
2. Thêm 2 "New repository secret":
   - Name: `UPSTASH_REDIS_REST_URL` / Value: (dán URL của bạn)
   - Name: `UPSTASH_REDIS_REST_TOKEN` / Value: (dán Token của bạn)
3. GitHub Actions sẽ tự động chạy mỗi 30 phút. Bạn cũng có thể vào tab **Actions** > chọn **Sync WPGraphQL Data to Redis** > nhấn **Run workflow** để chạy thủ công ngay lập tức.

## 2. Thiết lập trên Vercel (Để Next.js đọc được dữ liệu)
1. Vào Dashboard dự án trên Vercel > **Settings** > **Environment Variables**.
2. Thêm 2 biến `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN` với giá trị tương tự như trên GitHub.
3. Chắc chắn rằng `NEXT_PUBLIC_WORDPRESS_URL` cũng đã được khai báo ở đây.
4. Redeploy lại dự án để Vercel nhận biến môi trường mới.

## 3. Chạy thử ở môi trường Local
Để kiểm tra script lấy dữ liệu ở máy local của bạn:
1. Đảm bảo file `.env.local` đã có đủ 4 biến môi trường trên.
2. Chạy lệnh:
   ```bash
   node scripts/fetch-wp-data.mjs
   ```
3. Nếu màn hình log ra "✅ Lưu thành công key: ...", tức là dữ liệu đã nằm trên Upstash Redis.
4. Chạy `npm run dev`, các dữ liệu Post, Product, Banner sẽ được hiển thị như cũ.

## Lưu ý (Gotchas)
- **Độ trễ (Latency):** Vì cron chạy 30 phút một lần, các bài viết/sản phẩm mới sẽ mất tối đa 30 phút để cập nhật lên trang web.
- **Giới hạn dung lượng:** Gói miễn phí Upstash có giới hạn 256MB hoặc 10,000 requests/ngày. Script đã cấu hình `first: 100` để chỉ lấy 100 bài/sản phẩm mới nhất, giúp tiết kiệm dung lượng cache.
- **Trạng thái khi Redis rỗng:** Nếu Redis chưa có dữ liệu (lần đầu tiên deploy và cron chưa chạy), trang web sẽ không báo lỗi mà chỉ hiển thị mảng rỗng (không có bài viết/sản phẩm). Bạn cần chạy thủ công script 1 lần để mồi dữ liệu.
