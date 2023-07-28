import ReactEcharts from './common/EchartsWrap';
import extend from 'object-assign';
import { commonConfig } from './common/commonConfig';

interface FullPieConfigProps {
    title?: string;
    subtitle?: string;
    data: { value: number; name: string }[];
}

const FullPieConfig = ({
    title = '',
    subtitle = '',
    data
}: FullPieConfigProps) =>
    extend(
        commonConfig({
            title,
            subtitle
        }),
        {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: 24,
                left: 'center',
                itemWidth: 18,
                itemHeight: 10,
                orient: 'vertical',
                itemGap: 4
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    avoidLabelOverlap: false,
                    center: ['50%', '43%'],
                    top: '0',
                    bottom: '15%',
                    itemStyle: {
                        borderRadius: 4,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%', // {a}、{b}、{c}、{d}，分别表示系列名、数据名、数据值、百分比
                            textStyle: {
                                align: 'center',
                                baseline: 'middle',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                                fontWeight: 'normal'
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data
                    // width: "90%"
                }
            ]
        }
    );

const LiquidityPieChart = (props: FullPieConfigProps) => {
    return (
        <ReactEcharts
            option={FullPieConfig(props)}
            style={{ height: '300px', width: '90%' }}
        />
    );
};
export default LiquidityPieChart;
