<template>
  <div>
	<h2>—— K线数据图 ——</h2>
  <h3>{{code + ' ' + sharename}}</h3>
    <div id="kline" style="width: 90%;height:500px;"></div>
  </div>	
</template>

<script>
import $ from 'jquery'
var echarts = require('echarts')
var upColor = '#ec0000'
var upBorderColor = '#8A0000'
var downColor = '#00da3c'
var downBorderColor = '#008F28'
var option = {
  // title: {
  //   text: '上证指数',
  //   left: 0
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  // legend: {
  //   data: ['日K']
  // },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: [],
    scale: true,
    boundaryGap: false,
    axisLine: {onZero: false},
    splitLine: {show: false},
    splitNumber: 20,
    min: 'dataMin',
    max: 'dataMax'
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 93,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      y: '90%',
      start: 80,
      end: 100
    }
  ],
  series: [
    {
      name: '日K',
      type: 'candlestick',
      data: [],
      itemStyle: {
        normal: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor
        }
      }
    }
  ]
}
export default {
  name: 'chart',
  data () {
    return {
      code: '600000',
      sharename: '神马公司'
    }
  },
  mounted () {
    var _this = this
    // get kline data from the server
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8888/ajax/kline',
      data: {'code': _this.code},
      dataType: 'JSON',
      async: false,
      success: function (data) {
        option['xAxis']['data'] = data['date']
        option['series'][0]['data'] = data['values']
      }
    })
    // init the kline
    var myChart = echarts.init(document.getElementById('kline'))
    myChart.setOption(option)
  }
}
</script>