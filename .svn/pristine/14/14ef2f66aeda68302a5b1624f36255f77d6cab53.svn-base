<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
const echarts = require('echarts');

export default {
    name: 'dataSourcePie',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['保险', '保养', '维修', '整车', '其他']
                },
                series: [
                    {
                        name: '订单来源',
                        type: 'pie',
                        radius: '66%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 703456, name: '保险', itemStyle: {normal: {color: '#9bd598'}}},
                            {value: 1305923, name: '保养', itemStyle: {normal: {color: '#ffd58f'}}},
                            {value: 743250, name: '维修', itemStyle: {normal: {color: '#abd5f2'}}},
                            {value: 798403, name: '整车', itemStyle: {normal: {color: '#ab8df2'}}},
                            {value: 302340, name: '其他', itemStyle: {normal: {color: '#e14f60'}}}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        });
    }
};
</script>
