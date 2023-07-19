export enum ObjectType {
    Token = 'Token',
    Contract = 'Contract',
    EOA = 'EOA'
}

export enum RiskStatus {
    Processed = 'Processed',
    UnProcessed = 'UnProcessed',
    Ignored = 'Ignored'
}

export enum ObjectStatus {
    Safe = 'Safe',
    Danger = 'Danger',
    Warning = 'Warning'
}

/** 一条规则下一条参数的信息 */
export interface RuleParamInfo {
    index: number;
    max?: string;
    min?: string;
    name?: string;
    value?: string;
}

/** 规则信息 */
export interface RuleInfo {
    level: string;
    name: string;
    params?: RuleParamInfo[]; // 只有合约才有，EOA和Token没有此项(函数选择器的长度只有8即前4字节，而事件选择器的长度为64)
    selector?: string;
}

/** 一条对象信息 */
export interface ObjectInfo {
    _id: { $oid: string };
    address: string;
    category: ObjectType;
    chain_id: string;
    created_at: number; // 创建时间,注意是13位（毫秒)
    monitors?: string[]; // 该对象下绑定的监控器信息，预留内容
    name: string;
    notifications: string[]; // 通知方式(email,phone,slack,message)
    rules?: RuleInfo[];
    status?: ObjectStatus;
    strategies?: string[]; // 所有绑定的策略ID
    user_id: string;
}

/** 一条风险信息 */
export interface RiskInfo {
    _id: { $oid: string };
    assets: number;
    category?: ObjectType;
    chain_id?: string;
    created_at: number;
    labels: string[];
    level: string;
    name: string;
    notifications?: string[];
    object_address?: string;
    object_id: string;
    object_name?: string;
    related_hash: string;
    status: RiskStatus;
    strategies?: string[];
    suspicious_address: string;
    user_id: string;
}

/** 一条策略信息 */
export interface StrategyInfo {
    _id: { $oid: string };
    address: string;
    chain_id: string;
    count: number;
    created_at: number;
    name: string;
    objects?: number;
    params: string;
    signature: string;
    user_id: string;
}
