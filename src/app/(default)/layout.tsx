import React from "react";
// import Seat from "../../components/seatLayout/seatLayout";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

const Layout = ({children}:{children : React.ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
