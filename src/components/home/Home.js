import React, { useEffect, useState } from 'react';

import "./home.css";

const link = `http://localhost:3001/`;

const Home = () => {
    const [homeData, setHomeData] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let response = await fetch(link);
        let data = await response.json()
        setHomeData(data);
        setIsLoading(false)
    }

    return (
        isLoading ? null : ( <>    
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
                  <td>{item.agentName} / {item.lastCall.slice(11,-8)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
      </>)
    );
};

export default Home;
