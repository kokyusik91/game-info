import React, { useEffect, useState } from 'react';
import { client } from '../src/index';
import { gql } from '@apollo/client';
const App = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            user(userId: "김기태") {
              userId
            }
          }
        `,
      })
      .then((result) => {
        console.log(result);
        setUser(result.data);
      });
  });
  return <h1>{user.userId}</h1>;
};

export default App;
