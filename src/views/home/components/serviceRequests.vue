<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import util from '../../../styles/js/util';
const echarts = require('echarts');
export default {
    data(){
        return{
            fmtdata:util,
        }
    },
    name: 'serviceRequests',
    mounted () {
        const option = {
            dataZoom : {
                show : true,
                realtime : false,
                startValue:util.formatDate.format(new Date(new Date().getTime() - 22*24*60*60*1000), 'yyyy-MM-dd'),
                endValue:util.formatDate.format(new Date(new Date().getTime() - 24*60*60*1000), 'yyyy-MM-dd')
            },
            toolbox: {
                show : true,
                top:'-7px',
                feature : {
                    mark : {show: true},
                    dataView : {readOnly:false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: '3%',
                left: '1.2%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08', '2017-10-09', '2017-10-10', '2017-10-11', '2017-10-12', '2017-10-13', '2017-10-14', '2017-10-15', '2017-10-16', '2017-10-17', '2017-10-18', '2017-10-19', '2017-10-20', '2017-10-21', '2017-10-22', '2017-10-23', '2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27', '2017-10-28', '2017-10-29', '2017-10-30', '2017-10-31','2017-11-01','2017-11-02','2017-11-03','2017-11-04','2017-11-05']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '新装订单',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#2d8cf0'
                    }},
                    data: [12, 13, 10, 13, 9, 23, 21,9,12,10,12,10,12, 13, 10, 13, 9, 23, 21,9,12,10,12,10,12, 13, 10, 13, 9, 23, 21,9,12,10,12,10,]
                },
                {
                    name: '完成订单',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#10A6FF'
                    }},
                    data: [25, 35, 27, 23, 29, 33, 31,35,26,12,12,20,25, 35, 27, 23, 29, 33, 31,35,26,12,12,20,25, 35, 27, 23, 29, 33, 31,35,26,12,12,20]
                },
                // {
                //     name: '保险订单',
                //     type: 'line',
                //     stack: '总量',
                //     areaStyle: {normal: {
                //         color: '#0C17A6'
                //     }},
                //     data: [379, 268, 354, 269, 310, 478, 358,450,320,230,350,330]
                // },
                // {
                //     name: '餐饮/外卖',
                //     type: 'line',
                //     stack: '总量',
                //     areaStyle: {normal: {
                //         color: '#4608A6'
                //     }},
                //     data: [320, 332, 301, 334, 390, 330, 320]
                // },
                // {
                //     name: '快递/电商',
                //     type: 'line',
                //     stack: '总量',
                //     label: {
                //         normal: {
                //             show: true,
                //             position: 'top'
                //         }
                //     },
                //     areaStyle: {normal: {
                //         color: '#398DBF'
                //     }},
                //     data: [820, 645, 546, 745, 872, 624, 258]
                // }
            ]
        };
        const serviceRequestCharts = echarts.init(document.getElementById('service_request_con'));
        serviceRequestCharts.setOption(option);

        window.addEventListener('resize', function () {
            serviceRequestCharts.resize();
        });
    }
};
</script>