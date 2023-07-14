import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { IssuesCloseOutlined } from '@ant-design/icons';

import RiskCard from '@/sections/RiskAlert/RiskCard';
import FPPageHeader from '@/components/FPPageHeader';
import API from '@/api';

function RiskAlertDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // waiting: 这里需要全局数据的存储

    useEffect(() => {
        if (!id) return;
        // Api.get(`/api/risk/${detailId}`)
        //     .then(res => {
        //         console.log(res);
        //         setRiskDetail(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }, [id]);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <FPPageHeader
                    icon={<IssuesCloseOutlined />}
                    text="Risk Alert"
                />
                <Button
                    className="ml-3"
                    type="primary"
                    onClick={() => {
                        navigate('/risk');
                    }}
                >
                    Show All
                </Button>
            </div>
            <div>
                {/* {Object.keys(riskDetail).length > 0 && (
                    <RiskCard cardData={riskDetail} />
                )} */}
            </div>
        </>
    );
}

export default RiskAlertDetail;
