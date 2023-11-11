import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { launches } from '../queries';
import '../Styles/Ticket.css';
import chevronWithCircleRight from '../assets/raster/chevronWithCircleRight@2x.png'; 

const Ticket = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(launches);
  const [launchDetail, setLaunchDetail] = useState(null);

  useEffect(() => {
    if (data && data.launches) {
      const specificLaunch = data.launches.find(launch => launch.id === id);
      setLaunchDetail(specificLaunch);
    }
  }, [data, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!launchDetail) return <p>No launch data available.</p>;

  const launchYear = new Date(launchDetail.launch_date_utc).getFullYear();

  return (
    <div className='launch-ticket-container'>
      <div className="ticket-header">
        <button className="go-back" onClick={() => window.history.back()}>
          <img src={chevronWithCircleRight} alt="Back" />
        </button>
      </div>
      <div className="ticket-content">
        <div className="launch-ticket">
          <div className="launch-info">
            <section className="mission-section">
              <h4>MISSION NAME</h4>
              <h1>{launchDetail.mission_name}</h1>
            </section>
            <section className="rocket-info">
              <div className="rocket-name">
                <h4>ROCKET NAME</h4>
                <h4>{launchDetail.rocket.rocket_name}</h4>
              </div>
              <div className="rocket-type">
                <h4>ROCKET TYPE</h4>
                <h4>{launchDetail.rocket.rocket_type}</h4>
              </div>
            </section>
            <section className="date-section">
              <h5>LAUNCH YEAR</h5>
              <h3>{launchYear}</h3>
            </section>
          </div>
        </div>
        <div className="ticket-action">
          <button className="print-button" onClick={() => window.print()}>Print Ticket</button>
        </div>
      </div>
    </div>
  );
  
};

export default Ticket;