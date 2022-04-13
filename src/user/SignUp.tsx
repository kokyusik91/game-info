import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
const SignUp = () => {
  const ADD_USER = gql`
    mutation addUserProfile($params: createUserArgs!) {
      createUser(createUserArgs: $params) {
        id
        email
        password
      }
    }
  `;
  const [createUser] = useMutation(ADD_USER);
  const [sendId, setId] = useState("");
  const [sendPassword, setPassword] = useState("");
  const [sendEmail, setEmail] = useState("");
  const inputId = (e: any) => {
    setId(e.target.value);
  };

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const inputEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const doRegist = () => {
    const params = {
      email: sendEmail,
      password: sendPassword,
    };

    createUser({
      variables: { params },
    });
  };
  return (
    <div className="SignUp">
      <br />
      회원가입
      <br />
      <span>이메일</span>
      <br />
      <input onChange={inputEmail} placeholder="이메일" />
      <br />
      <br />
      <span>비밀번호</span>
      <br />
      <input onChange={inputPassword} placeholder="비밀번호" />
      <br />
      <br />
      <button onClick={doRegist}>회원가입 하기</button>
    </div>
  );
};

export default SignUp;
