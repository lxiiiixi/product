import * as UserApi from './interface/user';
import * as ObjApi from './interface/obj';
import * as StyApi from './interface/sty';
import * as RiskApi from './interface/risk';
import * as AbiApi from './interface/abi';

const API = {
    UserApi,
    ObjApi,
    StyApi,
    RiskApi,
    AbiApi
} as const;

export default API;
