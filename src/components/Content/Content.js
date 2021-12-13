import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router';
import { useRooms } from '../../contexts/RoomsContext';
import RoomsList from '../Rooms/RoomsList';
import MySpinner from '../shared/MySpinner';
import './Content.css';

const Content = () => {
  const { fetchRooms, loading, error, rooms } = useRooms();

  const [page, setPage] = useState(0);
  const location = useLocation();

  const roomPerPage = 6;

  const pageCount = Math.ceil(rooms.length / roomPerPage);

  const pageVisited = page * roomPerPage;
  const paginateRooms = rooms.slice(pageVisited, pageVisited + roomPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(() => {
    fetchRooms();
    // if (window.location.search) {
    //   window.location.search = "";
    // }
  }, [location.search]);

  return (
    <Grid item md={12}>
      {loading && <MySpinner size={50} />}
      {!loading && error && <h2>{error}</h2>}
      {!loading && rooms.length > 0 && <RoomsList rooms={paginateRooms} />}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'<'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="pagination"
        previousLinkClassName="previousBtn"
        nextLinkClassName="nextBtn"
        activeClassName="activeBtn"
        disabledClassName="disabledBtn"
      />
    </Grid>
  );
};

export default Content;
