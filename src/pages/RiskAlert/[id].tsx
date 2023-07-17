import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { IssuesCloseOutlined } from '@ant-design/icons';

import RiskCard from '@/sections/RiskAlert/RiskCard';
import FPPageHeader from '@/components/FPPageHeader';
import useGlobalDataStore from '@/store/globalDaraStore';

function RiskAlertDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const riskLists = useGlobalDataStore(state => state.riskLists);
    const displayRisk = riskLists.filter(item => item._id.$oid === id)[0];

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
                {displayRisk._id && <RiskCard cardData={displayRisk} />}
            </div>
        </>
    );
}

export default RiskAlertDetail;
