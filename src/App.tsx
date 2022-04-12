import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const App = () => {
  useEffect(() => {
    setUserId(1);
  }, []);

  const GET_USER = gql`
    query getUserName($id: Float!) {
      getUser(id: $id) {
        id
        email
        password
      }
    }
  `;

  const ADD_USER = gql`
    mutation addUserProfile($params: createUserArgs!) {
      createUser(createUserArgs: $params) {
        id
        email
        password
      }
    }
  `;

  const [userId, setUserId] = useState(0);
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const { data } = useQuery(GET_USER, {
    variables: { id: userId },
  });
  const userInfo = data && data.getUser;

  const handleSubmit = () => {
    const params = {
      email: inputId,
      password: inputPassword,
    };
    createUser({
      variables: { params },
    });
  };

  const [createUser] = useMutation(ADD_USER);

  const handleId = (e: any) => {
    setInputId(e.target.value);
  };

  const handlePassword = (e: any) => {
    setInputPassword(e.target.value);
  };

  return (
    <>
      <h1>query 사용</h1>
      <h2>받아온 유저 정보</h2>
      <h3>유저 이메일 : {userInfo && userInfo?.email}</h3>
      <h3>유저 패스워드 : {userInfo && userInfo?.password}</h3>
      <hr />
      <h1>Mutation 사용</h1>
      <span>아이디</span>
      <input type='text' onChange={handleId} value={inputId} />
      <br />
      <span>비밀번호</span>
      <input type='text' onChange={handlePassword} value={inputPassword} />
      <button type='button' onClick={handleSubmit}>
        제출
      </button>
    </>
  );
};

export default App;
