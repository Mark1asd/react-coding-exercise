import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { launches } from "../queries";
import "../Styles/Launches.css";
import logo from "../assets/raster/wordmark@2x.png";
import Loader from "./Loader";

const page_size = 6;

const Launches = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allLaunches, setAllLaunches] = useState([]);
  const [displayedLaunches, setDisplayedLaunches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();
  const { loading, error, data } = useQuery(launches);

  useEffect(() => {
    if (data && data.launches) {
      setAllLaunches(data.launches);
      setDisplayedLaunches(data.launches.slice(0, page_size));
    }
  }, [data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setSearched(true);
    const filteredLaunches = allLaunches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedLaunches(filteredLaunches);
    setCurrentPage(1);
  };

  const loadMoreLaunches = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const nextLaunches = allLaunches.slice(
      currentPage * page_size,
      nextPage * page_size
    );
    setDisplayedLaunches(displayedLaunches.concat(nextLaunches));
  };

  const handleRowClick = (id) => {
    navigate(`/ticket/${id}`);
  };

  if (loading) return <p><Loader /></p>;
  if (error) return <p>Error :(</p>;

  const totalLaunches = allLaunches.length;
  const currentDisplayed =
    currentPage * page_size > totalLaunches
      ? totalLaunches
      : currentPage * page_size;
  const totalPages = Math.ceil(totalLaunches / page_size);
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="back-home-image">
      <div className="content-box">
        <div className="table-header">
          <img src={logo} alt="SpaceX Logo" className="logo" />
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder="Search for flights"
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              SEARCH
            </button>
          </div>
        </div>
        {searched && displayedLaunches.length === 0 && (
          <p>No missions found with the name "{searchTerm}".</p>
        )}
            <div className="line">
              <div className="fat-line"></div>
            </div>
            
        <table className="launches-table">
          <thead>
            <tr>
              <th>MISSION NAME</th>
              <th>ROCKET NAME</th>
              <th><text className="center-text">ROCKET TYPE</text></th>
              <th><text className="center-text">LAUNCH YEAR</text></th>
            </tr>
            {/* TODO: Логіка для переміщення повзунка за обраним сортуванням та зробити його відображення */}
            {/* <tr className="ruler-row">
              <tr colSpan="4">
                <div className="line"></div>
                <div className="fat-line"></div>
              </tr>
            </tr> */}
          </thead>
          
          <tbody>
            {displayedLaunches.map((launch) => (
              <tr key={launch.id} onClick={() => handleRowClick(launch.id)}>
                
                <td>{launch.mission_name}</td>
                <td>{launch.rocket.rocket_name}</td>
                <td style={{ textAlign: "center" }}>
                  {launch.rocket.rocket_type}
                </td>
                <td style={{ textAlign: "center" }}>
                  {new Date(launch.launch_date_utc).getFullYear()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayedLaunches.length > 0 && !isLastPage && (
          <div className="pagination">
            <span>{currentDisplayed} of {totalLaunches}</span>
            <button onClick={loadMoreLaunches} disabled={loading || isLastPage}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Launches;