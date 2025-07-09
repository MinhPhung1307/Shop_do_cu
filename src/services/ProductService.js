import axios from "axios";

export const axiosJWT = axios.create();

export const PushProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};

// Thêm hàm này để lấy tất cả sản phẩm
export const getAllProducts = async (data) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/getproduct`,
    data
  );
  return res.data;
};
// Thêm hàm này để lấy thông tin sản phẩm
export const getDetailsProduct = async (productId) => {
  // Bỏ tham số data
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-details/${productId}`
    // Bỏ tham số data thứ hai ở đây
  );
  return res.data;
};

// HÀM GỌI API ĐẶT GIÁ ĐẤU
export const placeBid = async (productId, bidData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/bid/${productId}`,
    bidData
  );
  return res.data;
};

// hàm update
export const updateProduct = async (productId, data, access_token) => {
  // productId: ID của sản phẩm cần cập nhật
  // data: Dữ liệu cần cập nhật (ví dụ: { status: "sold", _idbuy: "buyerId" })
  // accessToken: Token xác thực của người dùng (từ Redux user.access_token)

  const res = await axiosJWT.put(
    // Sử dụng axiosJWT để có thể thêm interceptor cho token
    `${process.env.REACT_APP_API_URL}/product/update/${productId}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`, // Gửi token xác thực trong header
      },
    }
  );
  return res.data;
};
export const markAsSold = async (
  productId,
  buyerId,
  finalPrice,
  access_token
) => {
  const res = await axiosJWT.put(
    // Dùng endpoint mới được định nghĩa ở backend
    `${process.env.REACT_APP_API_URL}/product/mark-as-sold/${productId}`,
    {
      buyerId: buyerId, // Gửi ID người mua trong body request
      finalPrice: finalPrice, // Gửi giá cuối cùng của giao dịch
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`, // Dùng Authorization header chuẩn
      },
    }
  );
  return res.data;
};
