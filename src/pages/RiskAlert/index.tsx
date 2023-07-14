import { useEffect, useMemo, useState } from 'react';

import { IssuesCloseOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

import FPPageHeader from '@/components/FPPageHeader';
import ContactCard from '@/sections/Strategies/ContactCard';
import FilterLine from '@/sections/RiskAlert/FilterLine';
import RiskCard from '@/sections/RiskAlert/RiskCard';

import { RiskStatus, RiskInfo } from '@/config/commonInterface';
import API from '@/api';

export interface FilterProps {
    status: RiskStatus;
    level: string;
    time: string;
}

function ObjectMonitor() {
    const [riskLists, setRiskLists] = useState<RiskInfo[]>([]);
    const [filters, setFilters] = useState<FilterProps>({
        status: RiskStatus.UnProcessed,
        level: 'All',
        time: '365 days'
    });

    const getRiskLists = () => {
        API.RiskApi.getRiskList()
            .then(res => {
                setRiskLists(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getRiskLists();
    }, []);

    const handleFilter = (name: keyof FilterProps, value: string) => {
        setFilters({ ...filters, [name]: value });
    };

    const filterRiskLists = (riskLists: RiskInfo[]) => {
        return riskLists
            .filter(
                item =>
                    item.status.toLowerCase() === filters.status.toLowerCase()
            )
            .filter(item => {
                if (filters.level === 'All') {
                    return item;
                } else {
                    return (
                        item.level.toLowerCase() === filters.level.toLowerCase()
                    );
                }
            })
            .filter(item => {
                const riskCreatedTime = item.created_at;
                const nowTime = new Date().getTime();
                switch (filters.time) {
                    case '365 days':
                        return (
                            riskCreatedTime >
                            nowTime - 365 * 24 * 60 * 60 * 1000
                        );
                    case '180 days':
                        return (
                            riskCreatedTime >
                            nowTime - 180 * 24 * 60 * 60 * 1000
                        );
                    case '90 days':
                        return (
                            riskCreatedTime > nowTime - 90 * 24 * 60 * 60 * 1000
                        );
                    case '60 days':
                        return (
                            riskCreatedTime > nowTime - 60 * 24 * 60 * 60 * 1000
                        );
                    case '30 days':
                        return (
                            riskCreatedTime > nowTime - 30 * 24 * 60 * 60 * 1000
                        );
                    default:
                        return true;
                }
            });
    };

    const displayRiskLists = useMemo(
        () => filterRiskLists(riskLists),
        [riskLists, filters]
    );

    return (
        <div>
            <FPPageHeader icon={<IssuesCloseOutlined />} text="Risk Alert" />
            <ContactCard />
            <div className="mt-3 px-2 mb-5">
                <FilterLine filters={filters} handleFilter={handleFilter} />
            </div>
            <Row className="my-2" align="stretch" gutter={[18, 18]}>
                {displayRiskLists.map(data => (
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={12}
                        key={data._id.$oid}
                    >
                        <RiskCard cardData={data} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ObjectMonitor;
