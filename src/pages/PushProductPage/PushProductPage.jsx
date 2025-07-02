import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PushProduct.module.scss";
import ProductItem from "../../components/ProductItemComponent/ProductItem";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/slides/productSlide";
const cx = classNames.bind(styles);

export default function PushProductPage() {
  const [tab, setTab] = useState("add");

  // quy định các giá trị trong product
  const [stateProduct, setStateProduct] = useState({
    images: [],
    name: "",
    price: "",
    used: "",
    category: "",
    description: "",
    _iduser: "",
  });

  // thời gian hiện thông báo
  const [alert, setAlert] = useState(null);

  // hàm nhận giá trị khi nhập vào input
  const handleOnChange = (e) => {
    const { name, value, files } = e.target; // target là thuộc tính sự kiện đại diện cho các thẻ input
    //quy định riêng cho phần úp ảnh
    if (name === "images") {
      setStateProduct((prev) => ({
        ...prev, // cần có để khi cập nhật các trường khác không mất giá trị
        images: Array.from(files), // Lưu mảng file
      }));
    } else {
      // quy định cho các thẻ input còn lại
      setStateProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // gọi API
  const mutation = useMutationHook((data) => ProductService.PushProduct(data));
  const user = useSelector((state) => state.user);
  const { id } = user;
  const dispatch = useDispatch();

  // lấy id từ redux (thông tin người dùng sẽ được lưu lại khi đăng nhập ở redux)
  useEffect(() => {
    if (id) {
      setStateProduct((prev) => ({
        ...prev,
        _iduser: id,
      }));
    }
  }, [id]);
  // kiểm tra xem id đã được gán vào stateProduct chưa
  console.log(stateProduct._iduser);
  // biến để gán lại input file
  const fileInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stateProduct._iduser) {
      setAlert({ type: "error", message: "Vui lòng đăng nhập!" });
      setTimeout(() => setAlert(null), 2000);
      return;
    }
    const formData = new FormData();
    stateProduct.images.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("name", stateProduct.name);
    formData.append("price", stateProduct.price);
    formData.append("used", stateProduct.used);
    formData.append("category", stateProduct.category);
    formData.append("description", stateProduct.description);
    formData.append("_iduser", stateProduct._iduser);

    mutation.mutate(formData, {
      onSuccess: async () => {
        console.log(stateProduct);
        const newProduct = await ProductService.getAllProducts();
        dispatch(setProducts(newProduct));
        setStateProduct({
          images: [],
          name: "",
          price: "",
          used: "",
          category: "",
          description: "",
          _iduser: stateProduct._iduser,
        });
        setAlert({ type: "success", message: "Tạo sản phẩm thành công" });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setTimeout(() => {
          setAlert(null);
          setTab("history"); // Chuyển tab sau khi ẩn thông báo
        }, 2000);
      },
      onError: () => {
        setAlert({ type: "error", message: "Tạo sản phẩm thất bại!" });
        setTimeout(() => setAlert(null), 2000);
      },
    });
  };
  const products = useSelector((state) => state.product.products);
  console.log("danh sách sản phẩm", products);
  return (
    <div className={cx("container")}>
      {/* Thông báo */}
      {alert && (
        <div
          className={cx("alert", {
            success: alert.type === "success",
            error: alert.type === "error",
          })}
        >
          {alert.message}
        </div>
      )}
      {/* Thanh điều hướng */}
      <div className={cx("navTabs")}>
        <button
          className={cx("navButton", { activeTab: tab === "add" })}
          onClick={() => setTab("add")}
        >
          Đăng sản phẩm
        </button>
        <button
          className={cx("navButton", { activeTab: tab === "history" })}
          onClick={() => setTab("history")}
        >
          Lịch sử
        </button>
      </div>

      {/* Tab Nội dung */}
      {tab === "add" && (
        <section className={cx("section")}>
          <h2 className={cx("heading")}>Đăng Sản Phẩm</h2>
          <form className={cx("form")} onSubmit={handleSubmit}>
            <div className={cx("field")}>
              <label>Ảnh sản phẩm</label>
              <label htmlFor="images" className={cx("uploadArea")}>
                <i class="fa-solid fa-camera"></i> Chọn các file ảnh (tối đa 10
                tấm)
              </label>
              <input
                id="images"
                type="file"
                name="images"
                multiple
                ref={fileInputRef}
                onChange={handleOnChange}
                style={{ display: "none" }}
              />
              {/* Hiển thị tên file đã chọn */}
              <div className={cx("previewList")}>
                {stateProduct.images.length > 0 &&
                  stateProduct.images.map((file, idx) => (
                    <div key={idx} className={cx("previewItem")}>
                      <i
                        className="fa-solid fa-image"
                        style={{ marginRight: 4 }}
                      ></i>
                      {file.name.length > 30
                        ? file.name.slice(0, 27) + "..."
                        : file.name}
                    </div>
                  ))}
              </div>
            </div>
            {/* Các trường input */}
            <div className={cx("field")}>
              <label>Tên sản phẩm</label>
              <input
                name="name"
                onChange={handleOnChange}
                value={stateProduct.name}
                type="text"
                required
              />
            </div>
            <div className={cx("field")}>
              <label>Giá bán (VND)</label>
              <input
                name="price"
                onChange={handleOnChange}
                value={stateProduct.price}
                type="number"
                required
              />
            </div>
            <div className={cx("field")}>
              <label>Thời gian đã dùng</label>
              <input
                name="used"
                onChange={handleOnChange}
                value={stateProduct.used}
                type="text"
                placeholder="Ví dụ: 6 tháng"
              />
            </div>
            <div className={cx("field")}>
              <label>Danh mục</label>
              <select
                name="category"
                onChange={handleOnChange}
                value={stateProduct.category}
                required
              >
                <option value="">-- Chọn --</option>
                <option value="Tài liệu">Tài liệu</option>
                <option value="Dụng cụ">Dụng cụ</option>
                <option value="Nội thất">Nội thất</option>
                <option value="Đồ điện tử">Đồ điện tử</option>
                <option value="Đồng phục">Đồng phục</option>
              </select>
            </div>
            <div className={cx("field")}>
              <label>Mô tả</label>
              <textarea
                value={stateProduct.description}
                rows={3}
                name="description"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit" className={cx("submitButton")}>
              Xác nhận
            </button>
          </form>
        </section>
      )}

      {tab === "history" && (
        <section className={cx("section")}>
          <h2 className={cx("heading")}>Lịch Sử Đã Đăng</h2>

          <div className={cx("section__content")}>
            <div>
              {products && products.length > 0 ? (
                [...products]
                  .reverse()
                  .map((item) =>
                    String(item._iduser) === String(id) ? (
                      <ProductItem
                        key={item._id}
                        IMG={`http://localhost:3001/${item.images[0].replace(
                          /\\/g,
                          "/"
                        )}`}
                        NAME={item.name}
                        PRICE={item.price}
                        STATUS={item.status}
                      />
                    ) : null
                  )
              ) : (
                <div>Chưa có sản phẩm nào.</div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
