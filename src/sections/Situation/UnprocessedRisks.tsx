import RiskCard from './RiskCard';
import useGlobalDataStore from '@/store/globalDaraStore';
import { RiskStatus } from '@/config/commonInterface';

function UnprocessedRisks() {
    const RiskData = useGlobalDataStore(state => state.riskLists).filter(
        item => item.status === RiskStatus.UnProcessed
    );

    return (
        <div>
            <div className="text-red-500 text-xl font-semibold">
                Unprocessed Risk<span className="text-sm mx-2">3</span>
            </div>
            {RiskData.map(item => (
                <RiskCard key={item._id.$oid} data={item} />
            ))}
        </div>
    );
}

export default UnprocessedRisks;
