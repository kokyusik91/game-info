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
  let [emailAuthNumber, setEmailAuthNumber] = useState(true);

  const [createUser] = useMutation(ADD_USER);
  const [sendPassword, setPassword] = useState<string>("");
  const [sendEmail, setEmail] = useState<string>("");

  const handleChangePasswordValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    console.log("새로고침 막음");
  };
  const sendAuthEmail = () => {
    setEmailAuthNumber(false);
  };
  return (
    <div className="SignUp">
      <form onSubmit={submitUserAccount}>
        <div>회원가입</div>
        <span>이메일</span>
        <div>
          <input onChange={handleChangeEmailValue} placeholder="이메일" />
          <button onClick={sendAuthEmail}>이메일 인증</button>
          <div hidden={emailAuthNumber}>
            <input placeholder="인증번호" />
          </div>
        </div>
        <div>
          <span>비밀번호</span>
        </div>
        <div>
          <input onChange={handleChangePasswordValue} placeholder="비밀번호" />
        </div>
        <button onClick={doRegist}>회원가입 하기</button>
      </form>
    </div>
  );
};

export default SignUp;
