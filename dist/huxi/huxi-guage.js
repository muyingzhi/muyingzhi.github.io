var option = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 1200,
      splitNumber: 12,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: true
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        distance: -50,
        color: '#f99',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 20,
        borderRadius: 8,
        offsetCenter: [0, '55%'],
        fontSize: 60,
        fontWeight: 'bolder',
        formatter: '{value} cc/sec',
        color: 'auto'
      },
      data: [
        {
          value: 30
        }
      ]
    },
  ]
};

var ecGuage=null;
  export default {
    draw(elementId,value){
      if(ecGuage==null || ecGuage.isDisposed()){
        var domGuage = document.getElementById(elementId);
        ecGuage = echarts.init(domGuage);
        window.addEventListener('resize', ecGuage.resize);
      }
      option.series[0].data[0].value=value;
      ecGuage.setOption(option);
    },
    clean(){
      ecGuage.dispose();
    }
  };
  
