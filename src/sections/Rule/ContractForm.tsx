import { useState, useEffect, useMemo } from 'react';
import { Row, Col, message } from 'antd';
import { ObjectInfo } from '@/config/commonInterface';
import API from '@/api';
import FPAddCard from '@/components/FPAddCard';
import FunctionRuleCard from './FormCards/FunctionRuleCard';
import EventRuleCard from './FormCards/EventRuleCard';

function ContractForm({
    objectInfo,
    handleSetSelector
}: {
    objectInfo: ObjectInfo;
    handleSetSelector: (name: string, value: string) => void;
}) {
    const [newRuleLists, setNewRuleLists] = useState(objectInfo.rules || []);
    const [abiInfo, setAbiInfo] = useState({ abi: '[]' });

    const functionLists = useMemo(
        () =>
            newRuleLists &&
            newRuleLists.filter(item => (item.selector as string).length <= 10),
        [newRuleLists]
    );

    const eventLists = useMemo(
        () =>
            newRuleLists &&
            newRuleLists.filter(item => (item.selector as string).length > 10),
        [newRuleLists]
    );

    useEffect(() => {
        API.AbiApi.getAbi(objectInfo.chain_id, objectInfo.address)
            .then(res => {
                if (res.status === 200) {
                    setAbiInfo(res.data);
                } else {
                    message.warning(
                        'Abi doesn‘t exsit, please input the abi manually'
                    );
                }
            })
            .catch(err => {
                message.open({
                    type: 'warning',
                    content: err.response.data.message
                });
            });
    }, []);

    // waiting: 这里的一些删除和增加操作和默认值的赋值可能会有一点点问题 后面完成后需要检查一下
    // 比如说我的 event rule 3 有值而rule4没有值，但是删除了rule3之后rule4变成了rule3，会接受rule3之前的值，这样是不对的
    // 应该本次的操作我记录全部的值，而不是按照索引筛选，这里可能是一个潜在的大 bug，后期一定要弄清楚是否正确

    const handleAddEvent = () => {
        const newRule = {
            level: '',
            name: '',
            params: [],
            selector: '0x000000000000000'
        };
        setNewRuleLists([...newRuleLists, newRule]);
    };

    const handleAddFunction = () => {
        const newRule = {
            level: '',
            name: '',
            params: [],
            selector: ''
        };
        setNewRuleLists([...newRuleLists, newRule]);
    };

    const handleDelete = (ruleIndex: number) => {
        console.log(newRuleLists, ruleIndex);

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
            <Col xs={24} sm={12} md={12} lg={12}>
                {functionLists &&
                    functionLists.map((item, index) => (
                        <div key={index + 1}>
                            <FunctionRuleCard
                                ruleIndex={index + 1}
                                ruleValue={item}
                                abi={abiInfo.abi}
                                handleDelete={handleDelete}
                                handleSetSelector={handleSetSelector}
                            />
                        </div>
                    ))}
                <div className="h-[250px]">
                    <div className="p-2 text-main-textGray text-lg font-semibold">
                        Function
                    </div>
                    <FPAddCard addFunction={handleAddFunction} />
                </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
                {eventLists &&
                    eventLists.map((item, index) => (
                        <div key={index + 1}>
                            <EventRuleCard
                                ruleIndex={functionLists.length + index + 1}
                                ruleValue={item}
                                abi={abiInfo.abi}
                                handleDelete={handleDelete}
                                handleSetSelector={handleSetSelector}
                            />
                        </div>
                    ))}
                <div className="h-[250px]">
                    <div className="p-2 text-main-textGray text-lg font-semibold">
                        Event
                    </div>
                    <FPAddCard addFunction={handleAddEvent} />
                </div>
            </Col>
        </Row>
    );
}

export default ContractForm;
