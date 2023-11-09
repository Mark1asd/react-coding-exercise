import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { LAUNCHES_QUERY } from '../queries';

const PAGE_SIZE = 6; // Number of launches to show per page

const Launches = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allLaunches, setAllLaunches] = useState([]); // Store all fetched launches
  const [displayedLaunches, setDisplayedLaunches] = useState([]); // Launches to display

  // Fetch all launches without specifying a limit and offset
  const { loading, error, data } = useQuery(LAUNCHES_QUERY, {
    variables: { /* Your variables if needed, without offset and limit */ },
  });

  useEffect(() => {
    if (data && data.launches) {
      setAllLaunches(data.launches); // Save all launches after loading
      // Set initial displayed launches
      setDisplayedLaunches(data.launches.slice(0, PAGE_SIZE));
    }
  }, [data]);

  if (loading && !allLaunches.length) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const totalPages = allLaunches.length ? Math.ceil(allLaunches.length / PAGE_SIZE) : 1;

  const loadMoreLaunches = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const nextLaunches = allLaunches.slice(0, nextPage * PAGE_SIZE);
    setDisplayedLaunches(nextLaunches);
  };

  const isLastPage = currentPage >= totalPages;

  return (
    <div>
      <h2>Launches</h2>
      <ul>
        {displayedLaunches.map((launch) => (
          <li key={launch.id}>
            {launch.mission_name} - {launch.rocket.rocket_name} - {launch.rocket.rocket_type} - {launch.launch_date_utc}
          </li>
        ))}
      </ul>
      <div>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={loadMoreLaunches} disabled={loading || isLastPage}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default Launches;
