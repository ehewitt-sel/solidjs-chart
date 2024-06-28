import { Component, createSignal, onMount } from 'solid-js';

import styles from './App.module.css';
import 'chart.js/auto'
import { DefaultChart } from 'solid-chartjs'
import { Chart, Colors } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';


const App: Component = () => {
  const points = 10000;
  Chart.register(zoomPlugin);
  
  const [xZoom, setXZoom] = createSignal({min:0,max:5000});
  
  const t = [...Array(points).keys()];
  const chartData = {
    labels: t,
    datasets: [
        {
            label: 'Sales',
            data: t.map(t => Math.sin(t/1.8) + Math.sin(t/2))
        },
    ],
}
const setZoom = (c:Chart) => { 
  var min = c.chart.scales.x.min;
  if (min < 0) { min = 0 }
  var max = c.chart.scales.x.max;
  if (max > points) { max = points }
  setXZoom({min, max}); 
}
const resetZoom = () => { setXZoom({min: 0,max: points})}
const zoomOptions = {

  pan: {
    enabled: true,
    mode: 'x',
    onPan: setZoom
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true
    },
    mode: 'x',
    onZoom: setZoom
  }
}
const chartPlugins = {
  zoom: zoomOptions,
  legend: { display: false }
}

const chartOptions = () => { return {
    scales: {
      x: {
        type: 'linear',
        min: xZoom().min,
        max: xZoom().max,
        display: true
      }
    },
    animation: false,
    responsive: false,
    maintainAspectRatio: false,    
    plugins: chartPlugins,
    elements: {
      point: { radius: 0},
      line: { borderWidth: 1 }
    }}
}

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <img src={logo} class={styles.logo} alt="logo" /> */}
        <p>
          Welcome to the PLang Evaluation System
        </p>
        <button onClick={resetZoom}>Reset</button>
        <DefaultChart width="1800" height="150" type="line" data={chartData} options={chartOptions()} />
        <DefaultChart width="1800" height="150" type="line" data={chartData} options={chartOptions()} />
      </header>
    </div>
  );
};

export default App;
