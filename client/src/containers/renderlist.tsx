import React, { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/reducers';

const mapStateToProps = (state: RootState) => {
  return {};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type RenderListProps = PropsFromRedux;

const RenderList: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'text 1', num: 10, bool: true },
    { id: 2, text: 'text 2', num: 20, bool: false },
    { id: 3, text: 'text 3', num: 30, bool: true },
  ]);

  return (
    <div>
      {items.map((listItem) => (
        <div key={listItem.id}>
          <Link
            to={{ pathname: '/listitem/' + listItem.id, state: { listItem } }}
            style={{ marginTop: '25px', padding: '5px' }}
          >
            List Item {listItem.id}
          </Link>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default connector(RenderList);
