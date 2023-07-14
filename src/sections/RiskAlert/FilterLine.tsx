import { Space, Button, Dropdown, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FilterProps } from '@/pages/RiskAlert';
import { RiskStatus } from '@/config/commonInterface';

const levelItems = [
    { label: 'All', key: 'All' },
    { label: 'Critical', key: 'Critical' },
    { label: 'High', key: 'High' },
    { label: 'Other', key: 'Other' }
];
const timeItems = [
    { label: '365 days', key: '365 days' },
    { label: '180 days', key: '180 days' },
    { label: '90 days', key: '90 days' },
    { label: '60 days', key: '60 days' },
    { label: '30 days', key: '30 days' }
];

function FilterLine({
    filters,
    handleFilter
}: {
    filters: FilterProps;
    handleFilter: (name: keyof FilterProps, value: string) => void;
}) {
    return (
        <Row className="border border-solid border-t-2 border-x-0 border-b-0 border-levelColor-safe">
            <Col xs={24} sm={24} md={12} lg={12}>
                <Space>
                    {[
                        RiskStatus.UnProcessed,
                        RiskStatus.Processed,
                        RiskStatus.Ignored
                    ].map(item => (
                        <Button
                            key={item}
                            type={filters.status === item ? 'primary' : 'text'}
                            className={`rounded-t-none h-10 rounded-xl font-semibold ${
                                filters.status === item
                                    ? ''
                                    : 'bg-white text-gray-400'
                            }`}
                            onClick={() => handleFilter('status', item)}
                        >
                            {item}
                        </Button>
                    ))}
                </Space>
            </Col>
            <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                className="flex justify-end items-center mt-4 sm:mt-0"
            >
                <Space size={40}>
                    <Space size="middle">
                        <span>Level</span>
                        <Dropdown
                            className="cursor-pointer"
                            menu={{
                                items: levelItems,
                                onClick: ({ key }) => {
                                    handleFilter('level', key);
                                },
                                selectable: true,
                                defaultSelectedKeys: [filters.level]
                            }}
                        >
                            <Space>
                                {filters.level}{' '}
                                <span className="text-gray-500 text-xs">
                                    <DownOutlined />
                                </span>
                            </Space>
                        </Dropdown>
                    </Space>
                    <Space size="middle">
                        <span>Discovery time</span>
                        <Dropdown
                            className="cursor-pointer"
                            menu={{
                                items: timeItems,
                                onClick: ({ key }) => {
                                    handleFilter('time', key);
                                },
                                selectable: true,
                                defaultSelectedKeys: [filters.time]
                            }}
                        >
                            <Space>
                                {filters.time}{' '}
                                <span className="text-gray-500 text-xs">
                                    <DownOutlined />
                                </span>
                            </Space>
                        </Dropdown>
                    </Space>
                </Space>
            </Col>
        </Row>
    );
}

export default FilterLine;
