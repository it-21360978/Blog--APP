import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

function UserDash() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {!!user && <h1>Hi {user.name}</h1>}
      
    </div>
  );
}

export default UserDash;
