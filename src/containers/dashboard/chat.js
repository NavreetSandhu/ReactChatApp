import React, { useEffect,useRef, useState } from 'react';
import Pagination from "react-js-pagination";
import ScrollArea from "react-scrollbar";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFile ,getMFile} from '../../utilities/common';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import { Container, Row, Col, Button, FormGroup, Label, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { getContacts,getChat,uploadDoc } from '../../actions/chat';
import Socket from '../../components/socket';
import { roomId, saveName, userId, chatlist ,chatadds} from '../../actions/chat';
import ScrollToBottom, { useAtEnd, useAtTop, useAtBottom, useScrollToEnd, useSticky, useObserveScrollPosition, useScrollToBottom} from 'react-scroll-to-bottom';
import { css } from 'glamor';
import InfiniteScroll from 'react-infinite-scroll-component';


const chat = ({ history }) => {
   
    const chat = useSelector(state => state.chat);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [hasMore, setHasmore] = useState(true);
    const [mType, setMtype] = useState(1);
    const [mpage, setMpage] = useState(1);
    const [message, setMessage] = useState('');
    const ROOT_CSS = css({
        height: 600,
        width: 400
    });
    const [status, setStatus] = useState(false);
    const [socket, setsocket] = useState(null);
    const [name, setName] = useState('');
    const myRef = useRef(null);

    useEffect(() => {
        if (!status) {
          
            // action creator call here
            dispatch(chatlist(null));
            dispatch(getContacts({ pageNumber: page }, res => {
                if (res) {
                    console.log('sdfd');
                }
            }));
            if (chat && chat.roomid) {
                Socket.onEvent(chat.roomid);
                dispatch(getChat({ pageNumber: mpage, roomId: chat && chat.roomid }, res => {
                    if (res) {
                        console.log('sdfd');
                    }
                }));
            }
        }
        setStatus(true);
    });

    const handlePageChange = (page) => {
        setPage(page);
        dispatch(getContacts({ pageNumber: page }, res => {
            if (res) {
                console.log('sdfd');
            }
        }));
    };
    const handleMPageChange = (page) => {
        setMpage(page);
        dispatch(getChat({ pageNumber: page, roomId: chat && chat.roomid }, res => {
            if (res) {
                if (chat && chat.chat && chat.chat.rows.length === chat.chat.count) {
                    setHasmore(false);
                }
                console.log('sdfd');
            }
        }));
    };
    const uploadD = (e) => {
        var ext = e[0].name.split('.').pop();

        console.log(e,ext);

        setMessage(e[0].name);
        setMtype(2);
        dispatch(uploadDoc({ chatMedia:e  }, res => {
            if (!res) {
                setMessage('');
                    //dispatch(roomId(res.id));

               
            }
        }));
    };



    const openchat = (name, id, userd) => {

        dispatch(roomId(id));
        dispatch(saveName(name));
        dispatch(userId(userd));
        Socket.onEvent(id);
        console.log(socket);
        // socket.on(`new${user.data.id}`, (res) => {
        //     console.log(res, user.data.id, 'sfssssssssssssssssssssssssssssssssssssssssss');
        //     if (chat && chat.roomid == res.chatRoomId) {
        //         dispatch(chatadds(res));
        //     }
        // });

        // socket.on("new66", (res) => {
        //     console.log(res, user.data.id, 'ggggggggggggggggggggggggggggggggg');
        //     if (chat && chat.roomid == res.chatRoomId) {
        //         dispatch(chatadds(res));
        //     }
        // });
        console.log('rooommmidddd',id);
        dispatch(getChat({ pageNumber: 1, roomId: id  }, res => {
            if (res) {
                console.log('sdfd');
            }
        }));
        dispatch(getContacts({ pageNumber: page }, res => {
            if (res) {
                console.log('sdfd');
            }
        }));
    };

    const profileView = () => {
        history.push(`/professional-profile/${chat && chat.userid}`);
    };

    const top = () => {
        console.log('sdf');
    };

    const changeMessage = (e) => {
        setMessage(e);
        setMtype(1);
    };


    
    
    const send = () => {

        if (mType == 1) {
            Socket.emitEvent('message', {
                "chatRoomId": chat && chat.roomid,
                "message": message,
                "userId": user && user.data.id,
                "messageType": 1
            }, res => {
                    //console.log(res);
                    setMtype(1);
                    setMessage('');
                console.log(res);
                dispatch(chatadds(res));
                
                dispatch(getContacts({ pageNumber: page }, res => {
                    if (res) {
                        console.log('sdfd');
                    }
                }));
            });
        }
        else {

            Socket.emitEvent('message', {
                "chatRoomId": chat && chat.roomid,
                "media": chat && chat.files,
                "userId": user && user.data.id,
                "messageType": 2
            }, res => {
                    setMtype(2);
                    setMessage('');
                    dispatch(chatadds(res));
                    dispatch(getContacts({ pageNumber: page }, res => {
                        if (res) {
                            console.log('sdfd');
                        }
                    }));
                //dispatch(roomId(res.id));

            });
        }
       
        };


    const emitEvent = (event, payload = {}, callback) => {
    console.log(event, "emit started");
    socket.emit(event, payload, (res) => {
        console.log(event, "=======>", res);
        callback(res);
    });
};

//    static join = (event, callback) => {
//    console.log(event, "jjjj started");
//    this.socket.on('new' + '65', (res) => {
//        console.log("cccccccccc", storeObj);
//        Chat.update(res);
//        console.log("error", res);
//    });
//};

    const authenticate = (sock) => {
      

        sock.emit("authenticate", { token: user && user.data.loginToken }, (res) => {
        console.log("=======>", res);
    });
};

const onNameChange = (value) => {
     
     setName(value);

     dispatch(getContacts({ pageNumber: page,search:value }, res => {
                if (res) {
                    console.log('sdfd');
                }
            }));

};

    return (
        <div className="container">
            <div className="row grid-spacing">
                <div className="col-md-12 col-lg-12">
                    <div className="card">
                        <div className="d-flex flex-row">
                            <div className="chat-left flex-shrink-0  align-items-stretch">
                                <div className="chat-search">
                                    <div className="input-icons">
                                        <input className="input-field" type="text" value={name} onChange={(e) => onNameChange(e.target.value)} placeholder="Search a coach" />
                                        <label className="icon">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="11.3271" y="13.1436" width="2.18177" height="7.27256" rx="1.09088" transform="rotate(-45 11.3271 13.1436)" fill="#24DAC6"></rect><circle cx="9.78403" cy="10.0581" r="5.45442" transform="rotate(-45 9.78403 10.0581)" fill="white" stroke="#24DAC6" stroke-width="2">
                                                </circle></svg>
                                        </label>
                                    </div>
                                </div>
                                <div className="chat-user-info-wrapper">
                                    {chat && chat.contacts && chat.contacts.count == 0 && 
                                        <div className="cu-message">No Converstion yet! </div>
                                    } 
                                    <div className="chat-user-section">
                                        <div className="cus-body">
                                            {chat && chat.contacts && chat.contacts.rows.map((list, i) => {
                                                return (
                                                    <div key={i} className="cu-list" >
                                                        <a onClick={() => openchat(list.user[0].firstName + ' ' + list.user[0].lastName, list.roomId, list.user[0].id)} href="javascript:void(0)" className="d-flex flex-row ">
                                                            <div className="cu-avtar flex-shrink-0">
                                                               
                                                                    <img className="rounded-circle cu-img" src={list.user[0].profileImage ? getFile(`profile_img/${list.user[0].profileImage}`) : require('../../assets/images/user-thumb-login.png')}  />
                                                               
                                                                    </div>
                                                            <div  className="flex-grow-1 over-flow-section">
                                                                <div className="d-flex w-100">
                                                                    <div className="cu-name flex-grow-1">{list.user[0].firstName} {list.user[0].lastName}</div>
                                                                    <div className="cpost-info-wrapper d-flex justify-content-end flex-shrink-0 align-items-center">
                                                                        <div className="cpost-count">{list.message.length > 0 && list.message[0].unreadMsg}</div>
                                                                        <div className="cpost-date">{list.timeDiff}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="cu-message">{list.message.length > 0 && list.message[0].message}</div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                );
                                            }
                                            )}
                                           
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-pagination-wrapper">

                                    <Pagination

                                        activePage={page}
                                        itemsCountPerPage={9}
                                        totalItemsCount={chat && chat.contacts && chat.contacts.count ? chat.contacts.count : 0}
                                        pageRangeDisplayed={4}
                                        onChange={(e) => handlePageChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="chat-right flex-grow-1  align-items-stretch">
                                <div className="chat-area-header d-flex justify-content-between">

                                    <div className="chat-user-name align-self-center online"><a href="javascript:void(0)"><i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                                    </a>{chat && chat.name}
                                        {/*<span>Online</span>*/}
                                    </div>
                                </div>
                                
                                {/*<ScrollArea
                                speed={0.8}
                                className="chat-area"
                    
                                horizontal={false}
                                vertical={true}
                                    focusableTabIndex={80}

                                smoothScrolling={true}
                                >*/}
                                <ScrollToBottom  className={ROOT_CSS}>
                                    <div >
                                    <InfiniteScroll
                                        dataLength={chat && chat.chat && chat.chat.rows.length} //This is important field to render the next data
                                        next={() => handleMPageChange(mpage+1)}
                                        hasMore={hasMore}
                                        //scrollableTarget="scrollableDiv"

                                        //endMessage={
                                        //    <p style={{ textAlign: 'center' }}>
                                        //        <b>Yay! You have seen it all</b>
                                        //    </p>
                                        //}
                                        // below props only if you need pull down functionality
                                        ///refreshFunction={this.refresh}
                                        
                                        pullDownToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                                        }
                                        releaseToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                                        }>
                                            {chat && chat.chat && chat.chat.rows && chat.chat.rows.length > 0 ?
                                            <React.Fragment>

                                                {user && user.data && chat && chat.chat && chat.chat.rows.map((k, i) => {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            {k.userId != user.data.id ?
                                                                <div className="chat-msg-content-wrapper">
                                                                    <div className="chat-msg-content">
                                                                        <div className="chat-ower-name">{k.firstName} {k.lastName} </div>
                                                                        <div className="chat-msg-date">{k.timeDiff}</div>
                                                                        {k.messageType == 1 ?
                                                                            <div className="chat-msg-text">
                                                                                {k.message}
                                                                            </div>
                                                                            :
                                                                            'file'
                                                                        }
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="chat-msg-content-wrapper">
                                                                    <div className="chat-msg-content owner ">
                                                                        <div className="chat-ower-name">{k.firstName} {k.lastName} </div>
                                                                        <div className="chat-msg-date">{k.timeDiff}</div>
                                                                        {k.messageType == 1 ?
                                                                            <div className="chat-msg-text">
                                                                                {k.message}
                                                                            </div>
                                                                            :
                                                                            //<FileViewer
                                                                            //    fileType={k.media.split('.').pop()}
                                                                            //    filePath={getMFile(k.media)}
                                                                            //     />
                                                                            <div>
                                                                              
                                                                                {k.media.split('.').pop() === "png" || "jpg" || "bmp" || "gif" ?
                                                                                    <img src={getMFile(k.media)} height={100} width={100} /> : '' }
                                                                                <div className="chat-msg-text">
                                                                                    {k.media}
                                                                                </div><br></br>
                                                                                <div className="flex-shrink-0"><a target="blank" href={getMFile(k.media)} > <button className="btn btn-xs btn-primary">view </button></a>
                                                                                </div>
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                    {k.status == 1 &&
                                                                        <div className="chat-msg-info">Seen</div>
                                                                    }
                                                                </div>
                                                            }
                                                        </React.Fragment>

                                                    );
                                                })}
                                            </React.Fragment>
                                            :
                                                <p style={{ textAlign: 'center' }}>
                                               <b>No Messages!</b>
                                            </p>

                                        }
                                        </InfiniteScroll>
                                    </div>
                                    </ScrollToBottom>
                                   
                             
                                <div className="chat-area-footer d-flex justify-content-between align-items-center">
                                    <div className="flex-shrink-0">
                                        <label for="file-input">
                                            <i class="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                                            <input onChange={(e) => uploadD(e.target.files)} id="file-input" accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" type="file" />
                                        </label>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <label for="file-input">
                                            <i class="fa fa-camera" aria-hidden="true"></i>
                                            <input onChange={(e) => uploadD(e.target.files)} id="file-input" accept="image/*" type="file" />
                                        </label>
                                    </div>
                                    <div className="flex-grow-1"><input onChange={(e) => changeMessage(e.target.value)} value={message} className="form-control" type="text" placeholder="Type" /></div>

                                    <div className="flex-shrink-0"><button disabled={message =='' ? true : false} onClick={() => send(1)}  className="btn btn-primary">Send</button></div>

                                </div>
                            </div>
                           

                        </div>
                </div>
               
                </div>
            </div>
           
        </div>
    );
};

export default withRouter(chat);
