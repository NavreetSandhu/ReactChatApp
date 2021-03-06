/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========                Page loader           ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const ReactLoader = ({ loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #fff;
`;
  return (
    loading && (
      <React.Fragment>
        <div className="loader-outer"> </div>
        <div className='sweet-loading'>
          <ClipLoader
            css={override}
            sizeUnit={'px'}
            size={100}
            color={'#B8D433'}
            loading={loading}
          />
        </div>
      </React.Fragment>
    )
  );
};

ReactLoader.propTypes = {
  loading: PropTypes.bool
};

ReactLoader.defaultProps = {
  loading: false
};

export default ReactLoader;
