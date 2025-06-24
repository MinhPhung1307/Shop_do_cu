import { Spin } from "antd";
import React from "react";

const Loading = ({ children, isLoading, delay = 200, className }) => {
    return (
        <div className={className}>
            <Spin spinning={isLoading} delay={delay}>
                {children}
            </Spin>
        </div>
    )
}

export default Loading;