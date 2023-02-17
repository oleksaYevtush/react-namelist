import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [invited, setInvited] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((resp) => resp.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.warn(err);
        alert('Помилка при отриманні користувачів!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onClickInvited = (id) => {
    // console.log(id);
    if (invited.includes(id)) {
      setInvited((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvited((prev) => [...prev, id]);
    }
  };

  const onClickSendInvited = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invited.length} />
      ) : (
        <Users
          onClickSendInvited={onClickSendInvited}
          invited={invited}
          onClickInvited={onClickInvited}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          items={users}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
