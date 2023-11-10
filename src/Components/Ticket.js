import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { launches } from '../queries';
import '../Styles/Ticket.css';

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
        <button className="go-back" onClick={() => window.history.back()}>← Back</button>
        <div className="ticket-content">
          <div className="launch-ticket">
            <div className="launch-info">
              <section className="date-section">
                <h5>YEAR</h5>
                <h3>{launchYear}</h3>
              </section>
              <section className="mission-section">
                <h4>MISSION</h4>
                <h1>{launchDetail.mission_name}</h1>
              </section>
              <section className="rocket-info">
                <div className="rocket-name">
                  <h4>ROCKET</h4>
                  <h4>{launchDetail.rocket.rocket_name}</h4>
                </div>
                <div className="rocket-type">
                  <h4>TYPE</h4>
                  <h4>{launchDetail.rocket.rocket_type}</h4>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-action">
        <button className="print-button" onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
  
};

export default Ticket;
