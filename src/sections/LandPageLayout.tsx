import LayoutFooter from './LayoutSections/LayoutFooter';
import HeaderBar from './LandpageSections/HeaderBar';
import { Outlet } from 'react-router-dom';

function LandPageLayout() {
    return (
        <div className="min-h-screen min-w-screen">
            <HeaderBar />
            <div className="px-9 pt-[100px] py-10 md:px-12 lg:px-28 bg-[#F9FBFF] w-full h-screen overflow-hidden">
                <Outlet />
            </div>
            <LayoutFooter isLandPage={true} />
        </div>
    );
}

export default LandPageLayout;
