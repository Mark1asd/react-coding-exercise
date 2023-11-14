import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { launches } from '../queries';
import Loader from "./Loader";
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

  if (loading) return <p><Loader /></p>;
  if (error) return <p>Error :(</p>;
  if (!launchDetail) return <p>No launch data available.</p>;

  const launchYear = new Date(launchDetail.launch_date_utc).getFullYear();

  return (
    <div className='launch-ticket-container'>
      <div className='ticket-content'>
        <button className='go-back' onClick={() => window.history.back()}>
          <img src={chevronWithCircleRight} alt='Back' />
        </button>
        <div className="launch-ticket">
          <div className="date-container">
            <div className="launch-date">
              <h6>LAUNCH YEAR</h6>
              <text >{launchYear}</text>
            </div>
          </div>
          <div className="mission-section">
            <h4>MISSION NAME</h4>
            <h1 >{launchDetail.mission_name}</h1>
          </div>
          <div className="rocket-info">
            <div>
              <h4>ROCKET NAME</h4>
              <text >{launchDetail.rocket.rocket_name}</text>
            </div>
            <div className="rocket-type">
              <h4>ROCKET TYPE</h4>
              <text>{launchDetail.rocket.rocket_type}</text>
            </div>
          </div>
        </div>
        <div className='ticket-action'>
          <button className='print-button' onClick={() => window.print()}>PRINT TICKET</button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;