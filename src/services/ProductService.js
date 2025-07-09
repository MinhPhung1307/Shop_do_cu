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
export const getAllProductCheck = async (access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getproduct-check/`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
// HÀM GỌI API ĐẶT GIÁ ĐẤU
export const placeBid = async (productId, bidData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/bid/${productId}`,
    bidData
  );
  return res.data;
};
