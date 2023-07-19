import { RulesFormData } from '@/pages/Rule/[id]';
import { RuleInfo, RuleParamInfo } from '@/config/commonInterface';

/**
 * @description 将从 Form 中获取的 contract rule 数据转换成接口需要的格式
 */

interface RuleMap {
    [ruleIndex: number]: RuleInfo;
}
function transformContractRules(input: RulesFormData): RuleInfo[] {
    let output = [];
    let ruleMap: RuleMap = {};

    for (const key in input) {
        const [rulePrefix, attribute, ...rest] = key.split('-');
        const ruleIndex = parseInt(rulePrefix.replace('rule', '')) - 1;

        if (!ruleMap[ruleIndex]) {
            ruleMap[ruleIndex] = {
                level: '',
                name: '',
                params: [],
                selector: ''
            };
        }

        if (attribute.includes('params')) {
            const paramIndex = parseInt(attribute.replace('params', ''));
            const paramValue = rest[0];

            if (!ruleMap[ruleIndex].params[paramIndex]) {
                ruleMap[ruleIndex].params[paramIndex] = { index: paramIndex };
            }
            ruleMap[ruleIndex].params[paramIndex]['name'] = paramValue;
            if (rest.length === 2) {
                const realValue = rest[1];
                ruleMap[ruleIndex].params[paramIndex][realValue] =
                    String(input[key]) || '';
            } else {
                ruleMap[ruleIndex].params[paramIndex]['value'] =
                    input[key] || '';
            }
        } else {
            // 对 selector 的处理 根据函数名+参数列表，转换成selector
            ruleMap[ruleIndex][attribute] = input[key];
        }
    }

    for (const ruleIndex in ruleMap) {
        output.push(ruleMap[ruleIndex]);
    }

    return output;
}

/**
 * @description 将从 contract rule 接口获取的数据转换成 Form 需要的格式
 */

function reverseContractRules(input: RuleInfo[]): RulesFormData {
    const output = {};

    input.forEach((rule, ruleIndex) => {
        const rulePrefix = `rule${ruleIndex + 1}`;

        output[`${rulePrefix}-name`] = rule.name;
        output[`${rulePrefix}-level`] = rule.level;
        output[`${rulePrefix}-selector`] = rule.selector;

        rule.params.forEach(param => {
            // console.log(param);
            const paramPrefix = `${rulePrefix}-params${param.index}`;

            if ('min' in param && 'max' in param) {
                output[`${paramPrefix}-${param.name}-min`] = param.min;
                output[`${paramPrefix}-${param.name}-max`] = param.max;
            } else {
                output[`${paramPrefix}-${param.name}`] = param.value;
            }
        });
    });

    return output;
}

export { transformContractRules, reverseContractRules };
