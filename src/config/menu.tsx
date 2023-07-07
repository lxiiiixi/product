import { ReactNode } from "react";
import {
    HomeOutlined,
    SafetyOutlined,
    ExclamationCircleOutlined,
    FieldTimeOutlined,
    BarChartOutlined,
    AlertOutlined,
} from "@ant-design/icons";

export interface MenuItem {
    key: string;
    title: string;
    path: string | null;
    icon: ReactNode;
}

export const siderMenuList: MenuItem[] = [
    {
        key: "1",
        title: "Dashboard",
        path: "/dashboard",
        icon: <HomeOutlined />,
    },
    {
        key: "2",
        title: "Object Monitoring",
        path: "/monitor",
        icon: <SafetyOutlined />,
    },
    {
        key: "3",
        title: "Risk Alert",
        path: "/risk",
        icon: <ExclamationCircleOutlined />,
    },
    {
        key: "4",
        title: "Emergency strategies",
        path: "/strategy",
        icon: <FieldTimeOutlined />,
    },
    {
        key: "5",
        title: "Object Situation",
        path: "/situation",
        icon: <BarChartOutlined />,
    },
    {
        key: "6",
        title: "7 x 24 Support",
        path: "/service",
        icon: <AlertOutlined />,
    },
];
