import React, { useEffect, useState } from "react";
import { ChartComponent } from "bar-chart-simple";
import AgentLog from "./agentLog/AgentLog";
import "./home.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const link = `http://localhost:3001/`;

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [homeData, setHomeData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [agentId, setAgentId] = useState("");
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
  return isLoading ? null : (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-100w">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgentLog agentId={agentId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
                  handleShow();
                }}
              >
                {item.agentName} / {item.lastCall.slice(11, -8)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChartComponent data={data()} chart_type="bar_chart" />
    </>
  );
};

export default Home;
