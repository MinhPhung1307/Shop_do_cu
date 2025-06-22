import { Spin } from "antd";
import React from "react";

const Loading = ({ children, isLoading, delay = 200, className }) => {
    return (
        <Spin spinning={isLoading} delay={delay} className={className}>
            {children}
        </Spin>
    )
}

export default Loading;