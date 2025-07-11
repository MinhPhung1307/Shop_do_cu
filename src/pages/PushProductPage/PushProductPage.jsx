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
  const [isdisable, setIsdisable] = useState(false);

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
  // biến để gán lại input file
  useEffect(() => {
    if (!stateProduct._iduser) {
      setIsdisable(true);
    } else {
      setIsdisable(false);
    }
  });
  const fileInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
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
          window.location.reload();
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
  const handleCancelOrder = async (id) => {
    try {
      const res = await ProductService.deleteProduct(id, user.access_token);
      console.log("Kết quả xoá:", res);
      if (res?.status === "OK" || res?.statusCode === 200) {
        setAlert({ type: "success", message: "Xóa sản phẩm thành công" });
        const newProductList = products.filter((item) => item._id !== id);
        dispatch(setProducts(newProductList));
      } else {
        setAlert({ type: "error", message: "Xóa thất bại!" });
      }
    } catch (error) {
      console.error("Lỗi xoá sản phẩm:", error);
      setAlert({ type: "error", message: "Đã xảy ra lỗi" });
    }
  };

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
            {/* Grid chia 2 cột */}
            <div className={cx("formGrid")}>
              {/* Cột trái - Ảnh */}
              <div className={cx("formColumn", "imageColumn")}>
                <div className={cx("field")}>
                  <label>Ảnh sản phẩm</label>
                  <label htmlFor="images" className={cx("uploadArea")}>
                    <i className="fa-solid fa-camera"></i> Chọn các file ảnh
                    (tối đa 10 tấm)
                  </label>
                  <input
                    id="images"
                    type="file"
                    name="images"
                    multiple
                    ref={fileInputRef}
                    onChange={handleOnChange}
                    style={{ display: "none" }}
                    disabled={isdisable}
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
              </div>

              {/* Cột phải - Thông tin sản phẩm */}
              {/* Các trường input */}
              <div className={cx("formColumn", "infoColumn")}>
                <div className={cx("field")}>
                  <label>Tên sản phẩm</label>
                  <input
                    name="name"
                    onChange={handleOnChange}
                    value={stateProduct.name}
                    type="text"
                    required
                    disabled={isdisable}
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
                    disabled={isdisable}
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
                    disabled={isdisable}
                  />
                </div>
                <div className={cx("field")}>
                  <label>Danh mục</label>
                  <select
                    name="category"
                    onChange={handleOnChange}
                    value={stateProduct.category}
                    required
                    disabled={isdisable}
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
                    disabled={isdisable}
                  />
                </div>
              </div>
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
                        onCancel={() => handleCancelOrder(item._id)}
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
