import React from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const DefaultComponent = ({
  children,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div>
      {showHeader && <HeaderComponent />}
      {children}
      {showFooter && <FooterComponent />}
    </div>
  );
};

export default DefaultComponent;
