import ReactEcharts from './common/EchartsWrap';
import extend from 'object-assign';
import { commonConfig } from './common/commonConfig';

interface KLineConfigProps {
    title?: string;
    subtitle?: string;
    data: {
        title: string[];
        data: (string | number)[][];
    };
}

const colorList = [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
];

const klineOption = ({ title = '', subtitle = '', data }: KLineConfigProps) =>
    extend(
        commonConfig({
            title,
            subtitle
        }),
        {
            animation: false,
            color: colorList,
            width: '100%',
            title: {
                left: 'center',
                text: ''
            },
            // legend: {
            //   top: 30,
            //   data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            axisPointer: {
                link: [
                    {
                        xAxisIndex: [0, 1]
                    }
                ]
            },
            // dataZoom: [
            //   {
            //     type: 'inside',
            //     xAxisIndex: [0, 1],
            //     start: (100 - select),
            //     end: 100,
            //     top: 65,
            //     height: 20
            //   }
            // ],
            xAxis: [
                {
                    type: 'category',
                    data: data.categoryData,
                    boundaryGap: false,
                    axisLine: { lineStyle: { color: '#777' } },
                    axisLabel: {
                        formatter: function (value) {
                            return value;
                        }
                    },
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        show: true
                    }
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: data.categoryData,
                    boundaryGap: false,
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    axisTick: { show: false },
                    axisLine: { lineStyle: { color: '#777' } },
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        type: 'shadow',
                        label: { show: false },
                        triggerTooltip: true,
                        handle: {
                            show: true,
                            margin: 30,
                            color: '#B80C00'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '$',
                    min: 0
                },
                {
                    scale: true,
                    splitNumber: 2,
                    axisLine: { lineStyle: { color: '#777' } },
                    splitLine: { show: true },
                    axisTick: { show: false },
                    axisLabel: {
                        inside: true,
                        formatter: '{value}\n'
                    }
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false }
                }
            ],
            grid: [
                {
                    left: 40,
                    right: 20,
                    top: 60,
                    height: 160
                },
                {
                    left: 30,
                    right: 20,
                    height: 50,
                    top: 160
                }
            ],
            series: [
                {
                    type: 'candlestick',
                    // name: '日K',
                    data: data.values,
                    itemStyle: {
                        color: '#ef232a',
                        color0: '#14b143',
                        borderColor: '#ef232a',
                        borderColor0: '#14b143'
                    },
                    emphasis: {
                        itemStyle: {
                            color: 'black',
                            color0: '#444',
                            borderColor: 'black',
                            borderColor0: '#444'
                        }
                    },
                    markPoint: {
                        label: {
                            formatter: function (param) {
                                return param != null
                                    ? Math.round(param.value) + ''
                                    : '';
                            }
                        },
                        data: [
                            {
                                name: 'Mark',
                                coord: ['2013/5/31', 2300],
                                value: 2300,
                                itemStyle: {
                                    color: 'rgb(41,60,85)'
                                }
                            },
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return (
                                    param.name +
                                    '<br>' +
                                    (param.data.coord || '')
                                );
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: false
                                        }
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: false
                                        }
                                    }
                                }
                            ],
                            {
                                name: 'min line on close',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: 'max line on close',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                }
            ]
        }
    );

function PriceSituationChart(props: KLineConfigProps) {
    return (
        <ReactEcharts
            option={klineOption(props)}
            style={{ height: '250px', width: '100%' }}
        />
    );
}

export default PriceSituationChart;
