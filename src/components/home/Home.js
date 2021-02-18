import React, { useEffect, useState } from "react";
import { ChartComponent } from "bar-chart-simple";
import AgentLog from "./agentLog/AgentLog";
import "./home.css";
import Modal from "react-awesome-modal";

const link = `http://localhost:3001/`;

const Home = () => {
  const [homeData, setHomeData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [agentId, setAgentId] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let response = await fetch(link);
    let data = await response.json();
    setHomeData(data);
    setIsLoading(false);
  };

  let data = () => {
    let dataArr = [];
    if (isLoading) {
      return null;
    } else {
      homeData.map((item, i) => {
        dataArr.push({
          data_category: item.number,
          data_value: item.numberOfCalls,
        });
      });
    }
    return dataArr;
  };

  let openModal = () => {
    setVisible(true);
  };

  let closeModal = () => {
    setVisible(false);
  };

  return isLoading ? null : (
    <>
      <table>
        <thead>
          <tr>
            <th>Phone number</th>
            <th>Number of calls</th>
            <th>Last call details</th>
          </tr>
        </thead>
        <tbody>
          {homeData.map((item, i) => (
            <tr key={i}>
              <td>{item.number}</td>
              <td>{item.numberOfCalls}</td>
              <td
                onClick={() => {
                  setAgentId(item.agentId);
                  openModal();
                }}
              >
                {item.agentName} / {item.lastCall.slice(11, -8)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        visible={visible}
        width="350"
        height="500"
        effect="fadeInUp"
        onClickAway={() => closeModal()}
      >
        <div className="modal">
            <AgentLog agentId={agentId} />
          
          <button className="closeButton" onClick={() => closeModal()}>close</button>
        </div>
      </Modal>
      <ChartComponent data={data()} chart_type="bar_chart" />
    </>
  );
};

export default Home;
