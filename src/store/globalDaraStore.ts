import { create } from 'zustand';
import { ObjectInfo, RiskInfo, StrategyInfo } from '@/config/commonInterface';

interface GlobalDataState {
    objectLists: ObjectInfo[];
    storeObjectLists: (list: ObjectInfo[]) => void;
    riskLists: RiskInfo[];
    storeRiskLists: (list: RiskInfo[]) => void;
    strategyLists: StrategyInfo[];
    storeStrategyLists: (list: StrategyInfo[]) => void;
}

const useGlobalDataStore = create<GlobalDataState>(set => ({
    objectLists: [],
    storeObjectLists: newList => {
        set(() => ({ objectLists: newList }));
    },
    riskLists: [],
    storeRiskLists: newList => {
        set(() => ({ riskLists: newList }));
    },
    strategyLists: [],
    storeStrategyLists: newList => {
        set(() => ({ strategyLists: newList }));
    }
}));

export default useGlobalDataStore;
