import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { Link } from 'react-router-dom';

export default (state) => {
  return (
    <Menu {...state}>
      <Link to="/">Вернуться на главную страницу</Link>
      <Link to="/favorite">Избранные</Link>
      <Link to="/addRoom">Добавьте новый номер</Link>
    </Menu>
  );
};