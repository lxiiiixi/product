import React, { ReactNode } from 'react';
import LayoutFooter from './LayoutSections/LayoutFooter';
import HeaderBar from './LandpageSetions/HeaderBar';

function LandPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" min-h-screen min-w-screen">
      <HeaderBar />
      <div className="px-9 pt-[100px] py-10 md:px-12 lg:px-28 bg-[#F9FBFF] w-full min-h-screen overflow-hidden">
        {children}
      </div>
      <LayoutFooter />
    </div>
  );
}

export default LandPageLayout;
