// main.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/main.css";

function Main() {
  const [selectedTask, setSelectedTask] = useState("Rendering");
  const [taskTime, setTaskTime] = useState("2시간");
  const [gpuLoad, setGpuLoad] = useState("높은 부하 (80% 이상 사용 예상)");
  const [taskMessage, setTaskMessage] = useState("");
  const navigate = useNavigate();

  const handleTaskChange = (e) => {
    const task = e.target.value;
    setSelectedTask(task);

    if (task === "Gaming") {
      setTaskTime("3시간");
      setGpuLoad("중간 부하 (50% 사용 예상)");
      setTaskMessage(
        "게임의 평균 프레임 레이트(FPS)를 표시합니다. FPS가 높을수록 더 부드러운 게임 플레이가 가능합니다."
      );
    } else if (task === "Video Rendering") {
      setTaskTime("2시간");
      setGpuLoad("높은 부하 (80% 이상 사용 예상)");
      setTaskMessage(
        "영상 파일의 렌더링 작업에 걸린 시간을 보여줍니다. 시간이 짧을수록 작업 효율이 높습니다."
      );
    } else if (task === "Graphic Design") {
      setTaskTime("4시간");
      setGpuLoad("매우 높은 부하 (90% 이상 사용 예상)");
      setTaskMessage(
        "그래픽 디자인 소프트웨어의 작업 속도를 표시합니다. 시간이 짧을수록 성능이 우수합니다."
      );
    }
  };

  const handleStartSimulation = () => {
    console.log("시뮬레이션 시작");
    navigate("/result", { state: { selectedTask } });
  };

  return (
    <div className="container">
      <div className="top-section">
        <div className="header-content">
          <img
            src="/images/wattup_main_logo.png"
            alt="wattup-logo"
            className="logo-img"
          />
          <div className="title-content">
            <h1 className="title">Watt Up</h1>
            <p className="subtitle">
              AMD GPU 성능, 전력 소비 실시간 분석 시뮬레이터
            </p>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="gray-box">
          <p className="gray-box-text">
            GPU 사용량을 확인하고 싶은 작업 유형을 선택해주세요
          </p>
          <div className="dropdown-container">
            <select
              className="dropdown"
              value={selectedTask}
              onChange={handleTaskChange}
            >
              <option value="Gaming">Gaming</option>
              <option value="Video Rendering">Video Rendering</option>
              <option value="Graphic Design">Graphic Design</option>
            </select>
          </div>
        </div>

        <div className="green-box">
          <div className="info-group">
            <div className="info">
              <p className="info-label">선택한 작업 유형</p>
              <p className="info-value1">{selectedTask}</p>
            </div>
          </div>
          <div className="info-group">
            <div className="info">
              <p className="info-label">예상 작업 시간</p>
              <p className="info-value2">{taskTime}</p>
            </div>
          </div>
          <div className="gpu-load-group">
            <div className="info">
              <p className="info-label">예상 GPU 부하 수준</p>
              <p className="info-value3">{gpuLoad}</p>
            </div>
            <button className="start-btn" onClick={handleStartSimulation}>
              시뮬레이션 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
