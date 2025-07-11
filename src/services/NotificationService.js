import axios from "axios";

export const axiosJWT = axios.create();

export const getNotifications = async (userId, accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/notifications/notifications/${userId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`, // Gửi token xác thực
        },
      }
    );
    return res.data;
  } catch (error) {
    // Ném lỗi để component gọi có thể bắt và xử lý
    throw error.response ? error.response.data : error.message;
  }
};

// Hàm để đánh dấu một thông báo là đã đọc
export const markNotificationAsRead = async (notificationId, accessToken) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/notifications/mark-read/${notificationId}`,
      {},
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    // Ném lỗi để component gọi có thể bắt và xử lý
    throw error.response ? error.response.data : error.message;
  }
};

// Yêu cầu tạo 1 thông báo mới
export const createNotify = async (data, accessToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/notifications/create/${data.senderId}`,
      data,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    // Ném lỗi để component gọi có thể bắt và xử lý
    throw error.response ? error.response.data : error.message;
  }
};

// gọi api yêu cầu xóa thông báo
export const deleteNotify = async (id, access_token) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/notifications/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
