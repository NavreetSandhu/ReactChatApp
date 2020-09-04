/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @author: smartData
*/



import React from 'react';
import Header from './headers/Header';
import MainHeader from './headers/MainHeader';
import Footer from './footers/Footer';


/*************** Public Layout ***************/
export const publicLayout = props => {
  window.scrollTo(0, 0);
  const path = props.children.props.history.location.pathname;
  return (
        <div className="front-screen-wrapper">{props.children}</div>
  );
};

/*************** Private Layout ***************/
export const privateLayout = props => {
  window.scrollTo(0, 0);
  return (
    <div className="main">
      <div className="header position-fixed">
              <MainHeader />
      </div>
      <div className=" content-wrapper">
            {props.children}
          </div>
      </div>
     
  );
};

