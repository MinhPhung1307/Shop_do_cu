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

export const getAllProductCheck = async (access_token,type) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/getproduct-check/?type=${type}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
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

// gọi api yêu cầu thay đổi trạng thái của sản phẩm
export const updateState = async (id, access_token) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/product/update-state/${id}`,
    {},
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
// hàm xác nhận mua
export const markAsSold = async (id, access_token, price, buyerId) => {
  // <-- THÊM price VÀ buyerId VÀO ĐỊNH NGHĨA HÀM
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/product/mark-as-sold/${id}`,
      {
        // <--- TRUYỀN DỮ LIỆU VÀO BODY REQUEST
        price: price, // Key là price, value là giá trị price nhận được
        _idbuy: buyerId, // <--- Key là _idbuy (phải khớp với tên trường trong req.body ở backend)
      },
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error; // Ném lỗi để Digital.jsx có thể bắt được
  }
};

// gọi api yêu cầu xóa sản phẩm
export const deleteProduct = async (id, access_token) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllProduct = async (access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-allproduct`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAuctionProducts = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/auction`
  );
  return res.data;
};