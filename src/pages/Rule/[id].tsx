import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UsergroupDeleteOutlined } from '@ant-design/icons';
import { Button, Form, message } from 'antd';
import FPPageHeader from '@/components/FPPageHeader';
import HeaderCard from '@/sections/Rule/HeaderCard';
import ContractForm from '@/sections/Rule/ContractForm';
import useGlobalDataStore from '@/store/globalDaraStore';
import {
    reverseContractRules,
    transformContractRules
} from '@/utils/contractRuleTansfer';
import { RuleInfo } from '@/config/commonInterface';
import API from '@/api';

export interface RulesFormData {
    [name: string]: string | number;
}

function ObjectRuleDetail() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const objectLists = useGlobalDataStore(state => state.objectLists);
    const displayObject = objectLists.filter(item => item._id.$oid === id)[0];

    // waiting: 使用全局数据管理的一个问题-这个页面并没有数据请求，如果我从一开始直接进入这个页面，也不会有登陆的过期校验，但是此时是没有全局数据的，这是一个需要思考的问题

    if (!displayObject) return <div className="flex-center">No data</div>;

    const { _id, name, address, chain_id, category, rules } = displayObject;

    const formInitialValues = useMemo(() => {
        switch (category) {
            case 'Contract':
                return reverseContractRules(rules as RuleInfo[]);
            case 'Token':
                return reverseContractRules(rules as RuleInfo[]); // waiting
            case 'EOA':
                return reverseContractRules(rules as RuleInfo[]); // waiting
        }
    }, [category]);

    const handleSetSelector = (name: string, value: string) => {
        form.setFieldsValue({ [name]: value });
    };

    const onFinish = (data: RulesFormData) => {
        if (category === 'Contract') {
            console.log(
                'Contract [id] onFinish',
                data,
                transformContractRules(data)
            );
            API.ObjApi.updateRule(_id.$oid, transformContractRules(data))
                .then(res => {
                    message.open({
                        type: 'success',
                        content: 'Customized Monitor Rule Updated Successfully!'
                    });
                })
                .catch(err => {
                    message.open({
                        type: 'warning',
                        content: err.response.data.message
                    });
                });
            // Api.put(`/api/obj/rule/${objInfo._id.$oid}`, transformContractRules(item)).then(res => {
            //     console.log(res);
            //     messageApi.open({
            //         type: 'success',
            //         content: "Customized Monitor Rule Added Successfully!",
            //     });
            // }).catch(err => {
            //     messageApi.open({
            //         type: 'warning',
            //         content: err.response.data.message,
            //     });
            //     // closeModal()
            // })
        } else if (category === 'Token') {
            // Api.put(`/api/obj/rule/${_id.$oid}`, transformContractRules(item)).then(res => {
            //     // console.log(res);
            //     closeModal(true)
            //     messageApi.open({
            //         type: 'success',
            //         content: "Customized Monitor Rule Added Successfully!",
            //     });
            // }).catch(err => {
            //     messageApi.open({
            //         type: 'warning',
            //         content: err.response.data.message,
            //     });
            //     closeModal()
            // })
        } else if (category === 'EOA') {
            // console.log(item, transformEOARules(item), reverseEOARule(transformEOARules(item)));
            // Api.put(`/api/obj/rule/${objInfo._id.$oid}`, transformEOARules(item)).then(res => {
            //     console.log(res);
            //     messageApi.open({
            //         type: 'success',
            //         content: "Customized Monitor Rule Added Successfully!",
            //     });
            // }).catch(err => {
            //     messageApi.open({
            //         type: 'warning',
            //         content: err.response.data.message,
            //     });
            // })
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <FPPageHeader
                    icon={<UsergroupDeleteOutlined />}
                    text="Object Monitoring / Rule Detail"
                />
                <Button
                    className="ml-3"
                    type="primary"
                    onClick={() => {
                        navigate('/monitor');
                    }}
                >
                    Back
                </Button>
            </div>
            <Form
                form={form}
                id="rule_form"
                layout="vertical"
                name="rule_form"
                onFinish={onFinish}
                initialValues={formInitialValues}
            >
                <HeaderCard address={address} chain_id={chain_id} name={name} />
                {category === 'Contract' && (
                    <ContractForm
                        objectInfo={displayObject}
                        handleSetSelector={handleSetSelector}
                    />
                )}
                {/* {category === 'Token' && <ContractForm />} */}
            </Form>
        </div>
    );
}

export default ObjectRuleDetail;
