import { Card, CardProps } from 'antd';

interface FPCardProps extends CardProps {
    headerBgColor?: string;
    headerFontColor?: string;
}

export default function FPCard({
    children,
    headerBgColor,
    headerFontColor,
    ...props
}: FPCardProps) {
    return (
        <Card
            headStyle={{
                backgroundColor: headerBgColor || 'none',
                color: headerFontColor || 'black'
            }}
            style={{ boxShadow: '0 4px 30px #cde1f4' }}
            bordered={false}
            {...props}
        >
            {children}
        </Card>
    );
}
