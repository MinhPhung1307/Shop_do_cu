function showSection(id, element) {
    // 1. Ẩn tất cả section
    document.querySelectorAll(".content-section").forEach(sec => {
      sec.style.display = "none";
    });
    // 2. Hiện section được chọn
    document.getElementById(id).style.display = "block";

    // 3. Gỡ 'active' khỏi tất cả menu
    document.querySelectorAll(".menu a").forEach(link => {
      link.classList.remove("active");
    });
    // 4. Thêm 'active' vào menu được click
    element.classList.add("active");
  }

  // Mặc định hiển thị "Quản lý tài khoản"
  window.onload = function() {
    document.getElementById("menu-account").click();
  }
  function showSection(id) {
      document.querySelectorAll(".content-section").forEach(sec => {
        sec.style.display = "none";
      });
      document.getElementById(id).style.display = "block";
    }const sampleProducts = [
  { code: "TL01", name: "Sách Kỷ Luật Bản Thân", price: "59.000đ", category: "Tài liệu", image: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" },
  { code: "TL02", name: "Giáo trình Toán Cao Cấp", price: "45.000đ", category: "Tài liệu", image: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" },
  { code: "DC01", name: "Thước dây", price: "15.000đ", category: "Dụng cụ", image: "https://cdn-icons-png.flaticon.com/512/2518/2518028.png" },
  { code: "NT01", name: "Ghế lười Tatami", price: "99.000đ", category: "Nội thất", image: "https://cdn-icons-png.flaticon.com/512/7856/7856530.png" },
  { code: "DĐT01", name: "Màn hình Samsung 24\"", price: "1.200.000đ", category: "Đồ điện tử", image: "https://cdn-icons-png.flaticon.com/512/841/841364.png" },
  { code: "ĐP01", name: "Áo đồng phục size XXL", price: "89.000đ", category: "Đồng phục", image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png" }
];

function filterByCategory(category) {
  const container = document.getElementById("category-products");
  container.innerHTML = "";
  const filtered = sampleProducts.filter(p => p.category === category);
  if (filtered.length === 0) {
    container.innerHTML = "<p>Không có sản phẩm nào thuộc danh mục này.</p>";
    return;
  }
  filtered.forEach(p => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-item";
    productDiv.innerHTML = `
      <img src="${p.image}" />
      <span class="code">${p.code}</span>
      <span class="name">${p.name}</span>
      <span class="price">${p.price}</span>
      <button class="delete-btn">🗑️ Xóa</button>
    `;
    container.appendChild(productDiv);
  });
}

function showSection(id, element) {
  document.querySelectorAll(".content-section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
  document.querySelectorAll(".menu a").forEach(link => {
    link.classList.remove("active");
  });
  element.classList.add("active");
}

window.onload = function() {
  document.getElementById("menu-account").click();
};
function deleteProduct(button) {
  const productDiv = button.parentElement;
  productDiv.remove();
  alert("Sản phẩm đã được xóa.");
}