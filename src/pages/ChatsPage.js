import React from 'react';
import moment from 'moment';
import { Route } from 'react-router-dom';
import { Spinner, Media, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import Chat from './ChatPage';
import routes from '../router/routes';
import useChatsPage from '../hooks/useChatsPage';
import useMe from '../hooks/useMe';
import colors from '../helpers/colors';
import notAvatar from '../images/notAvatar.png';

const ChatsPage = (props) => {
  const { match, history } = props;
  const [data, openChat] = useChatsPage();
  const [me] = useMe();
  if (!data) return <Spinner />;
  return (
    <div>
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 88px)',
      }}
      >
        <aside style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          marginLeft: '63px',
          background: 'white',
          paddingTop: '1px',
        }}
        >
          {data.map((i) => (
            <Button
              style={{
                padding: '0px',
                border: `1px solid  ${colors.main}`,
                marginBottom: '0px',
                marginTop: '-1px',
                marginLeft: '0px',
                width: '300px',
                background: i._id === match.params.id ? 'lightblue' : 'white',
                color: 'black',

              }}
              onClick={() => openChat({ chatId: i._id, match, history })}
              type="button"
            >
              <div
                style={{
                  paddingTop: '15px',
                  border: `1px solid #349A89 ${colors.main}`,
                  cursor: 'pointer',

                }}
              >
                {me._id === i.creator._id ? <Media
                  alt="interlocutorAvatar"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: ' 50%',
                    margin: '0 0 10px 4px',
                    float: 'left',
                  }}
                  src={i.interlocutor.profile.avatar === null
                    ? notAvatar
                    : i.interlocutor.profile.avatar}
                />
                  : <Media
                    alt="interlocutorAvatar"
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: ' 50%',
                      margin: '0 0 10px 4px',
                      float: 'left',
                    }}
                    src={i.creator.profile.avatar === null
                      ? notAvatar
                      : i.creator.profile.avatar}

                  />}
                <h7 style={{ margin: '0 0 10px 4px', float: 'left' }}>
                  {i.product && i.product.title
                    ? i.product.title
                    : 'Product'}
                </h7>
                <p style={{
                  float: 'right',
                  color: '#97a3b4',
                  margin: 'auto',
                  marginRight: '10px',
                  marginTop: '2px',
                }}
                >
                  {i.lastMessage && i.lastMessage.createdAt
                    ? moment(i.lastMessage.createdAt, 'x').fromNow()
                    : moment(i.createdAt, 'x').fromNow()}
                </p>


              </div>
              <p style={{
                maxHeight: '20px',
                overflow: 'hidden',
                color: '#97a3b4',
                marginTop: '-9px',
                textAlign: 'left',
                float: 'right',
                width: '82%',
              }}
              >
                {i.lastMessage && i.lastMessage.body
                  ? i.lastMessage.body
                  : ' i.lastMessage.body'}
              </p>
            </Button>
          ))}
          {data.length === 0
            ? <div style={{
              position: 'absolute',
              background: 'white',
              top: '45%',
              left: '45%',
            }}
            >
              <FontAwesomeIcon
                style={{
                  marginLeft: '33%',
                }}
                className="fa-3x"
                icon={faInbox}
                color="#6B7BF7"
              />
              <p>No messages for you... </p>
            </div> : null}
        </aside>
        <div style={{
          display: 'flex',
          flex: '2',
          background: 'white',

        }}
        >
          {match.path === routes.chats && data.length > 0 ? <div style={{
            display: 'flex',
            background: 'white',
            flex: 'none',
            margin: 'auto',
          }}
          >
            <p>Selected chat...</p>
          </div> : null}
          <Route exact path={routes.chat} component={Chat} />
        </div>
      </div>
    </div>
  );
};


export default ChatsPage;
