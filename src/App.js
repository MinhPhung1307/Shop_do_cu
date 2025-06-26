import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/Loading";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const checkAndGetUser = async () => {
      const { storageData, decoded } = handleDecoded();
      const now = new Date().getTime() / 1000;

      if (decoded?.exp < now) {
        try {
          const data = await UserService.refreshToken();
          localStorage.setItem(
            "access_token",
            JSON.stringify(data?.access_token)
          );
          const newDecoded = jwtDecode(data?.access_token);
          await handleGetDetailsUser(newDecoded?.id, data?.access_token);
        } catch (err) {
          console.error("Refresh token failed:", err);
          localStorage.removeItem("access_token");
        }
      } else if (decoded?.id) {
        await handleGetDetailsUser(decoded?.id, storageData);
      }
    };

    checkAndGetUser();
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currenttime = new Date();
      if (decoded?.exp < currenttime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  // useEffect(() => {
  //   fetchApi();
  // }, [])

  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
  //   return res.data;
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });
  // console.log(query)

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
