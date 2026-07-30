# YÊU CẦU CẤU HÌNH WORDPRESS CHO TRANG TIN TỨC (BLOG)

Để hệ thống hiển thị trang Tin tức (Blog) một cách đầy đủ và linh hoạt như thiết kế hiện tại, bạn cần cấu hình các trường dữ liệu (fields) trong WordPress. Dưới đây là danh sách tổng hợp những gì bạn cần chuẩn bị:

## 1. Các trường mặc định của WordPress (Không cần tạo ACF)

Khi đăng bài viết mới (Post) trong WordPress, bạn sử dụng các trường có sẵn sau:

*   **Tiêu đề (Title):** Tên bài viết.
*   **Nội dung (Content):** Toàn bộ nội dung chi tiết của bài viết, hỗ trợ đầy đủ các thẻ HTML, hình ảnh chèn giữa bài. (Sẽ hiển thị ở phần thân trang chi tiết tin tức).
*   **Ảnh đại diện (Featured Image):** Hình ảnh chính sẽ hiển thị trên Thẻ bài viết ở trang danh sách và ảnh to ở đầu trang chi tiết.
*   **Chú thích ảnh (Excerpt / Caption của Featured Image):** WordPress có sẵn phần Caption khi bạn tải ảnh lên. Dùng làm phần chú thích nổi lên ở góc ảnh to trong trang chi tiết (VD: *Nguyên mẫu Máy xúc lật điện Titan X-1*).
*   **Chuyên mục (Categories):** Dùng để phân loại bài viết (VD: *Mẹo bảo trì*, *Xu hướng ngành*). Hiển thị trên thanh Breadcrumb (đường dẫn trang) của trang chi tiết.
*   **Thẻ (Tags):** Dùng làm Nhãn phụ (Badge) hiển thị màu nổi bật ở trang chi tiết (VD: Thẻ `Đổi mới` hoặc `Công nghệ`).
*   **Tóm tắt (Excerpt):** Dùng làm đoạn mô tả ngắn hiển thị ở bên ngoài danh sách tin tức.
*   **Ngày đăng (Date):** Ngày xuất bản bài viết.

---

## 2. Các trường cần tạo thêm bằng ACF (Advanced Custom Fields)

Bạn cần tạo một Field Group mới trong ACF (ví dụ tên là: **Tin tức / Blog Settings**) và gắn (Location) cho `Post Type = Post`.

Dưới đây là danh sách các Custom Fields cần tạo:

| Tên trường (Field Label) | Tên biến (Field Name) | Loại (Field Type) | Ghi chú / Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Thời gian đọc** | `read_time` | Text / Number | Hiển thị trên thẻ bài viết và ngay đầu trang chi tiết (VD: `8 phút đọc`). |
| **Bài viết nổi bật?** | `is_featured` | True / False (Switch) | Đánh dấu bài viết này làm bài nổi bật ở đầu trang danh sách Tin tức. |
| **Tên tác giả** | `author_name` | Text | (Trang chi tiết) Tên chuyên gia viết bài (VD: *Tiến sĩ Sarah Jenkins*). |
| **Chức danh tác giả** | `author_role` | Text | (Trang chi tiết) Chức danh (VD: *Kỹ sư Trưởng Hệ truyền động*). |
| **Ảnh đại diện tác giả** | `author_avatar` | Image | (Trang chi tiết) Ảnh chân dung của người viết bài (Return Format: Image URL). |
| **Bài viết liên quan** | `related_posts` | Relationship | (Tùy chọn - Trang chi tiết) Nếu bạn muốn CHỈ ĐỊNH thủ công 3 bài viết liên quan ở cuối trang. Nếu không tạo trường này, hệ thống sẽ tự động lấy 3 bài viết mới nhất cùng chuyên mục. |

> [!TIP]
> **Về Mục lục (Table of Contents):**
> Ở trang chi tiết có phần "Trong bài viết này" (Mục lục bên trái). Tính năng này sẽ được hệ thống code tự động quét các thẻ Tiêu đề (`H2`, `H3`) trong Nội dung (Content) để tạo ra danh sách. Bạn **KHÔNG CẦN** tạo thêm trường ACF cho mục lục.

---

## 3. Cấu trúc truy vấn dự kiến (GraphQL)

Sau khi tạo xong, đây là cấu trúc dữ liệu mà Website (Next.js) sẽ gọi từ WordPress để bạn tham khảo:

```graphql
query GetPosts {
  posts {
    nodes {
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      blogFields {
        readTime
        isFeatured
        authorName
        authorRole
        authorAvatar {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
```

Bạn hãy dựa vào bảng số (2) để thiết lập ACF trên WordPress nhé. Sau khi bạn nhập liệu xong 1-2 bài viết mẫu, mình sẽ tiến hành kết nối API cho trang Tin tức!
