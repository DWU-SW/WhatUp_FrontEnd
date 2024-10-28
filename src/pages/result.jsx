import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { SyncLoader } from 'react-spinners'; 
import '../CSS/result.css';

Chart.register(...registerables);

const Result = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [fps, setFps] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isGenerating) {
        setLoading(true); 
        try {
          // API로부터 데이터 가져오기
          const response = await fetch('http://localhost:8080/api/wattup/generate?taskType=gaming');
          const result = await response.json();

          const powerData = result.powerData;
          const newLabels = powerData.map((entry) => entry.time);
          const newData = powerData.map((entry) => entry.power);

          setLabels(newLabels);
          setData(newData);
          setFps(result.fps);
        } catch (error) {
          console.error('데이터를 가져오는 중 에러 발생:', error);
        } finally {
          setLoading(false);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Power Consumption (W)',
        data: data,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Power Consumption (W)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const time = context.label;
            const power = context.raw;
            const currentDate = new Date();
            const fullTime = `${currentDate.toLocaleDateString()} ${time}`;
            return `날짜 및 시간: ${fullTime}, W: ${power}`;
          },
        },
      },
    },
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
  };

  return (
    <div className="result-container">
      <header className="header">
        <h1>WattUp</h1>
      </header>
      <div className="fps-display">
        <p>게임의 평균 프레임 레이트(FPS)를 표시합니다.</p>
        <p>FPS가 높을수록 더 부드러운 게임 플레이가 가능합니다.</p>
        <div className="fps-value">{fps} FPS</div>
      </div>
      <div className="button-container">
        <button className="stop-button" onClick={handleStopGeneration}>
          W값 생성 중지
        </button>
      </div>

      <div className="chart-container" style={{ position: 'relative' }}>
        <h2>소비전력 결과 차트</h2>
         {/* 로딩 중일 때 중앙에 로딩 스피너 표시 */}
         {loading && (
          <div className="loader-overlay">
            <SyncLoader color="#4caf50" size={15} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>
          </div>
        )}
        <Line data={chartData} options={chartOptions} />
      
  
      </div>
    </div>
  );
};

export default Result;
