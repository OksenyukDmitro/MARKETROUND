import React from 'react';
import moment from 'moment';
import { Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Chat from './ChatPage';
import routes from '../router/routes';
import useChatsPage from '../hooks/useChatsPage';
import colors from '../colors';

const ChatsPage = (props) => {
  const { match, history } = props;
  const [data, openChat] = useChatsPage();
  if (!data) return <Spinner />;
  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        height: 'calc(100vh - 88px)',
        background: 'white',

      }}
      >
        <aside style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1',
          overflow: 'auto',
          marginLeft: '63px',
        }}
        >
          {data.map((i) => (
            <button
              style={{
                padding: '0px',
                background: i._id === match.params._id ? 'rgba(152, 255, 143, 0.3)' : 'white',
                border: `1px solid  ${colors.main}`,
                marginBottom: '0px',
                marginTop: '2px',
              }}
              onClick={() => openChat({ chatId: i._id, match, history })}
              type="button"
            >
              <div
                style={{
                  paddingTop: '15px',
                  border: `1px solid #349A89 ${colors.main}`,
                  cursor: 'pointer',
                  background: i._id === match.params._id ? 'rgba(152, 255, 143, 0.3)' : 'white',
                }}

              >

                {i.product && i.product.title
                  ? i.product.title
                  : 'Product'}
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
                    : null}
                </p>

                <p style={{
                  maxHeight: '20px',
                  overflow: 'hidden',
                  marginLeft: '25px',
                  color: '#97a3b4',
                  marginTop: '3px',
                }}
                >
                  {i.lastMessage && i.lastMessage.body
                    ? i.lastMessage.body
                    : null}
                </p>
              </div>
            </button>
          ))}
        </aside>
        <div style={{
          display: 'flex',
          flex: '2',
          background: 'white',
        }}
        >
          <Route exact path={routes.chat} component={Chat} />
        </div>
      </div>
    </div>
  );
};


export default ChatsPage;