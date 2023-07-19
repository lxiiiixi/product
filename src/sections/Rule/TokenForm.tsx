import { useState, useEffect, useMemo } from 'react';
import { Row, Col, message, Space } from 'antd';
import { ObjectInfo } from '@/config/commonInterface';
import FPAddCard from '@/components/FPAddCard';
import TokenCard from './FormCards/TokenCard';
import API from '@/api';

function TokenForm({ objectInfo }: { objectInfo: ObjectInfo }) {
    const [newRuleLists, setNewRuleLists] = useState(objectInfo.rules || []);

    const handleAddRule = () => {
        const newRule = {
            level: '',
            name: '',
            params: [],
            selector: '0x000000000000000'
        };
        setNewRuleLists([...newRuleLists, newRule]);
    };

    const handleDelete = (ruleIndex: number) => {
        setNewRuleLists(oldList => {
            if (!oldList) return oldList;
            return oldList.filter((item, index) => index !== ruleIndex - 1);
        });
    };

    return (
        <Row
            justify="space-between"
            gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}
            className="my-5 mb-8"
        >
            {newRuleLists.map((item, index) => (
                <Col xs={24} sm={12} md={12} lg={12} key={index + 1}>
                    <TokenCard
                        ruleIndex={index + 1}
                        ruleValue={item}
                        handleDelete={handleDelete}
                    />
                </Col>
            ))}
            <Col xs={24} sm={12} md={12} lg={12}>
                <FPAddCard addFunction={handleAddRule} />
            </Col>
        </Row>
    );
}

export default TokenForm;
