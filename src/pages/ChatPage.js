import React from 'react';
import moment from 'moment';
import {
  Spinner, Input, Button, Media,
} from 'reactstrap';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import useMessages from '../hooks/useMessages';
import useMe from '../hooks/useMe';
import notAvatar from '../images/notAvatar.png';


const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 10,
});

const Chat = ({ match }) => {
  const [chat, addMessage, body, setBody] = useMessages(match.params.id);
  const [me] = useMe();

  if (!chat) {
    return <Spinner />;
  }
  const {
    messages,
    interlocutor,
    creator,
  } = chat;
  const localInterlocutor = me._id === interlocutor._id ? creator : interlocutor;

  return (
    <div style={{
      width: '100%',
      overflow: 'auto',
      border: '1px solid #e9ebf2',
      marginLeft: '1%',
    }}
    >


      {localInterlocutor ? (
        <div style={{
          height: '62px',
          width: '100%',
          borderBottom: '1px solid cornflowerblue',
        }}
        >
          <div style={{
            width: '50px',
            float: 'left',
          }}
          >
            <Media
              alt="interlocutorAvatar"
              style={{
                position: 'relative',
                marginTop: '5px',
                padding: '0px',
                width: '45px',
                height: '45px',
                borderRadius: ' 50%',
                border: '2.7px solid #349a89',
                textAalign: 'center',
                fontFamily: 'Helvetica',
                fontSize: '14px',
                lineHeight: '40px',
                maxWidth: '65px',
                overflow: 'hidden',

              }}
              src={
                localInterlocutor.profile.avatar === null
                  ? notAvatar
                  : localInterlocutor.profile.avatar
              }
            />
          </div>
          <p style={{
            float: 'left',
            marginLeft: '16px',
            marginTop: '19px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '50%',
          }}
          >{`${localInterlocutor.profile.firstName} ${localInterlocutor.profile.lastName}`}
          </p>
        </div>
      ) : null}

      <div />

      <aside style={{
        width: '100%',
        height: 'calc(100% - 156px)',
      }}
      >
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={messages.length}
              scrollToIndex={messages.length - 1}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={renderRow}
            />
          )}
        </AutoSizer>
      </aside>
      <div style={{
        display: 'flex',
        flexDdirection: 'row',
        border: '1px solid #e9ebf2',
        padding: '5px',
        position: 'fixed',
        bottom: '2%',
        marginLeft: '-1px',
        marginRight: '20px',
        height: '58px',
        width: 'calc(100% - 400px)',
      }}
      >
        <Input
          style={{
            flexGrow: 2,
            border: 'none',
          }}
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your message her"
        />
        <Button
          style={{
            border: ' 1px solid blue',
            color: 'white',
            marginRight: '40px',
            paddingTop: '0px',
          }}
          onClick={() => addMessage()}
          type="button"
        >
          SEND
        </Button>
      </div>
    </div>
  );

  function renderRow({
    parent, index, key, style,
  }) {
    const time = moment(messages[index].createdAt, 'x').fromNow();
    const isViewer = me && messages[index].createdBy === me._id;
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style} className="row">
          <div
            style={{
              padding: '8px',
              paddingTop: ' 0px',
              alignSelf: 'flex-end',
              maxWidth: '220px',
              width: 'fit-content',
              margin: '4px',
              marginTop: '8px',
              marginLeft: isViewer ? 'auto' : '0px',
              marginRight: isViewer ? '0px' : 'auto',
              paddingRight: '0px',
              paddingLeft: isViewer ? '0px' : '20px',
              overflow: 'hidden',
            }}
          >
            <div

              style={{
                color: 'black',
                borderRadius: '10%',
                padding: '6px',
                background: isViewer ? '#00aeef' : '#aaaeef',
                textAlign: isViewer ? 'right' : 'left',
              }}
            >
              {messages[index].body}
            </div>
            <p style={{
              fontSize: '13px',
              lineHeight: '26px',
              textAlign: 'right',
              color: '#97a3b4',
              marginBottom: '0px',
            }}
            >{time}
            </p>
          </div>
        </div>
      </CellMeasurer>
    );
  }
};

export default Chat;
