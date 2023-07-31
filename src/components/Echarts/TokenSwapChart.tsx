import ReactEcharts from './common/EchartsWrap';
import extend from 'object-assign';
import { commonConfig } from './common/commonConfig';
import * as echarts from 'echarts/core';

interface LineConfigProps {
    title?: string;
    names?: string;
    subtitle?: string;
    data: (string | number)[][];
    isSmooth: boolean;
    yType: string;
}

const lineConfig = ({
    title = '',
    subtitle = '',
    names,
    data,
    isSmooth,
    yType
}: LineConfigProps) =>
    extend(
        commonConfig({
            title,
            subtitle
        }),
        {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: title
            },
            grid: {
                left: '0%',
                bottom: '3%',
                width: '100%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: names
            },
            yAxis: {
                type: 'value',
                name: yType,
                min: 0
            },
            series: [
                {
                    type: 'line',
                    smooth: isSmooth ? isSmooth : 0,
                    lineStyle: {
                        color: '#4C68EC',
                        width: 5
                    },
                    name: title,
                    stack: 'Total',
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#4C68EC'
                            },
                            {
                                offset: 1,
                                color: '#FFFFFF'
                            }
                        ])
                    },
                    data: data
                }
            ]
        }
    );

function TokenSwapChart(props: LineConfigProps) {
    return (
        <ReactEcharts
            option={lineConfig(props)}
            style={{ height: '220px', width: '100%' }}
        />
    );
}

export default TokenSwapChart;
