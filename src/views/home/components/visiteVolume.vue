<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
const echarts = require('echarts');
export default {
    name: 'visiteVolume',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
            let xAxisData = [];
            let data1 = [];
            let data2 = [];
            for (let i = 0; i < 20; i++) {
                xAxisData.push('类目' + i);
                data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            }

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 0,
                    left: '2%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    nameTextStyle: {
                        color: '#c3c3c3'
                    }
                },
                series: [
                    {
                        name: '新装订单量',
                        type: 'bar',
                        data: [
                            {value: 453, name: '周一', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 879, name: '周二', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 2354, name: '周三', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 159, name: '周四', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 54, name: '周五', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 130, name: '周六', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 1103, name: '周日', itemStyle: {normal: {color: '#2d8cf0'}}}
                        ]
                    }
                ]
            };

            visiteVolume.setOption(option);

            window.addEventListener('resize', function () {
                visiteVolume.resize();
            });
        });
    }
};
</script>
