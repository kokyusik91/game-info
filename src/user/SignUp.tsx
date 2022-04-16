import { ChangeEventHandler, useEffect, useState } from "react";
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
  const [sendId, setId] = useState<string>("");
  const [sendPassword, setPassword] = useState<string>("");
  const [sendEmail, setEmail] = useState<string>("");

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const submitUserAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submission prevented");
  };
  return (
    <div className="SignUp">
      <form onSubmit={submitUserAccount}>
        <div>회원가입</div>
        <span>이메일</span>
        <div>
          <input onChange={inputEmail} placeholder="이메일" />
        </div>
        <div>
          <span>비밀번호</span>
        </div>
        <div>
          <input onChange={inputPassword} placeholder="비밀번호" />
        </div>
        <button onClick={doRegist}>회원가입 하기</button>
      </form>
    </div>
  );
};

export default SignUp;
