import ReactEcharts from './common/EchartsWrap';
import extend from 'object-assign';
import { commonConfig } from './common/commonConfig';

interface BarLineConfigProps {
    title?: string;
    subtitle?: string;
    names: string[];
    data: string;
}

const barlineConfig = ({
    title = '',
    subtitle = '',
    names,
    data
}: BarLineConfigProps) =>
    extend(
        commonConfig({
            title,
            subtitle
        }),
        {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
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
            yAxis: [
                {
                    type: 'value',
                    name: 'volume',
                    min: 0
                    // max:1000000,
                },
                {
                    type: 'value',
                    name: 'count',
                    min: 0
                    // max:10,
                }
            ],
            series: [
                {
                    type: 'bar',
                    name: 'volume',
                    barWidth: 20,
                    itemStyle: {
                        color: '#60E0F7'
                    },
                    data: data.volume
                },
                {
                    type: 'line',
                    name: 'count',
                    smooth: 0.6,
                    yAxisIndex: 1,
                    lineStyle: {
                        color: '#1D9FD6',
                        width: 2
                    },
                    data: data.count
                }
            ]
        }
    );
function TokenTransferChart(props: BarLineConfigProps) {
    return (
        <ReactEcharts
            option={barlineConfig(props)}
            style={{ height: '280px', width: '100%' }}
        />
    );
}

export default TokenTransferChart;
