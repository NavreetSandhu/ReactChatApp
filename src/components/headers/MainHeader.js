import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '../Loader';
import { logout } from '../../actions/user';
import { Row, Col } from 'reactstrap';
import ConnectionImage from '../../assets/images/profile-connection.jpg';
import ScrollArea from "react-scrollbar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFile } from '../../utilities/common';
import Socket from '../../components/socket';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../auth';

const header = ({ history}) => {

    const [Modal, setModal] = useState(false);
    const dispatch = useDispatch();
       const user = useSelector(state => state.user);

    const loader = useSelector(state => state.loader);
    const [status, setStatus] = useState(false);

 useEffect(() => {
        if (!status) {
          Socket.init();
        }
        setStatus(true);
    });
    const logoutUser = (token) => {
        dispatch(logout(token, res => {
            if (res) {
                history.push('/');

            }
        }));

    };

    

    return (

        <div id="header-main-wrapper" className="container-fluid ">
            <Row >
               <div className="col-2 col-sm-3 text-center header-logo">

                </div>
                <div className="col-5 col-sm-6 text-center header-logo">

                    <h2>Chat App</h2>
                </div>
                <div className="col-4 col-sm-3 ">
                    <ul className="notification">
                       
                     
                        <li className="dropdown">
                            <div className="dropdown-toggle" data-toggle="dropdown">
                                   
                                    <svg className="user-icon " viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 0C8.95161 0 0 8.95161 0 20C0 31.0484 8.95161 40 20 40C31.0484 40 40 31.0484 40 20C40 8.95161 31.0484 0 20 0ZM20 7.74194C23.9194 7.74194 27.0968 10.9194 27.0968 14.8387C27.0968 18.7581 23.9194 21.9355 20 21.9355C16.0806 21.9355 12.9032 18.7581 12.9032 14.8387C12.9032 10.9194 16.0806 7.74194 20 7.74194ZM20 35.4839C15.2661 35.4839 11.0242 33.3387 8.18548 29.9839C9.70161 27.129 12.6694 25.1613 16.129 25.1613C16.3226 25.1613 16.5161 25.1935 16.7016 25.25C17.75 25.5887 18.8468 25.8064 20 25.8064C21.1532 25.8064 22.2581 25.5887 23.2984 25.25C23.4839 25.1935 23.6774 25.1613 23.871 25.1613C27.3306 25.1613 30.2984 27.129 31.8145 29.9839C28.9758 33.3387 24.7339 35.4839 20 35.4839Z" fill="#C6E2E9" />
                                    </svg>
                                    </div>
                            <div className="dropdown-menu user-drop-down">

                                <a className="dropdown-item" href="javascript:void()" onClick={() => logoutUser(user.data.loginToken)}>Logout</a>

                            </div>
                        </li>
                    </ul>



                </div>

            </Row>

            <Loader loading={loader.isFetching} />

        </div>
    );
};

// header.propTypes = {
//     loader: PropTypes.object.isRequired,
//     user: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired,
//     getNotifications: PropTypes.func.isRequired,
//     sendRequest: PropTypes.func.isRequired,
//     markRead: PropTypes.func.isRequired,

// };

// const mapStateToProps = state => ({
//     user: state.user,
//     loader: state.loader,
//     connection: state.connection,
// });

// const mapDispatchToProps = dispatch => ({
//     logout: bindActionCreators(logout, dispatch),
//     getNotifications: bindActionCreators(getNotifications, dispatch),
//     sendRequest: bindActionCreators(sendRequest, dispatch),
//     markRead: bindActionCreators(markRead, dispatch)

// });

export default withRouter(header);