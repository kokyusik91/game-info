import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
const SignUp = () => {
  const ADD_USER = gql`
    mutation addUserProfile($params: createUserArgs!) {
      createUser(createUserArgs: $params) {
        id
      }
    }
  `;

  const SEND_EMAIL = gql`
    mutation sendEmail($params: createAuthNumberArgs!) {
      createAuthNumber(authEmailNumber: $params) {
        key
      }
    }
  `;
  const CHECK_EMAIL = gql`
    mutation checkAuth($params: checkAuthNumberArgs!) {
      checkAuthNumber(checkAuthData: $params) {
        value
      }
    }
  `;

  let [emailAuthNumberHidden, setEmailAuthNumberHidden] = useState(true);
  let [unAuthMessageHidden, setunAuthMessageHidden] = useState(true);
  let [authMessageHidden, setauthMessageHidden] = useState(true);
  const [createUser, createUserResponse] = useMutation(ADD_USER);
  const [createAuthNumber, createAuthNumbeResponse] = useMutation(SEND_EMAIL);
  const [checkAuthNumber, checkAuthNumberResponse] = useMutation(CHECK_EMAIL);
  const [sendPassword, setPassword] = useState<string>("");
  const [sendEmail, setEmail] = useState<string>("");
  const [authNumber, setAuthNumber] = useState<string>("");
  const handleChangePasswordValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeAuthNumberValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAuthNumber(e.target.value);
  };

  const doRegist = async () => {
    if (!authMessageHidden) {
      const params = {
        email: sendEmail,
        password: sendPassword,
      };

      try {
        await createUser({
          variables: { params },
        });
      } catch (err) {
        alert("이미 가입된 계정입니다.");
      }
    } else {
      alert("이메일 인증을 해주세요.");
    }
  };

  const preventSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleSendAuthEmail = async () => {
    const randNum = Math.floor(Math.random() * 1000000);
    const params = {
      randomUserId: `${randNum}`,
    };
    await createAuthNumber({ variables: { params } });
    setEmailAuthNumberHidden(false);
  };

  const handleCheckAuthNumber = async () => {
    const params = {
      randomUserId: createAuthNumbeResponse.data.createAuthNumber.key,
      authNumber: +authNumber,
    };

    try {
      await checkAuthNumber({
        variables: { params },
      });
      setauthMessageHidden(false);
      setunAuthMessageHidden(true);
    } catch (err) {
      setunAuthMessageHidden(false);
      setauthMessageHidden(true);
      console.log(err);
    }
  };
  return (
    <div className="SignUp">
      <div>회원가입</div>
      <span>이메일</span>
      <form onSubmit={preventSubmitEvent}>
        <div>
          <input onChange={handleChangeEmailValue} placeholder="이메일" />
          <button onClick={handleSendAuthEmail}>이메일 보내기</button>
        </div>
      </form>
      <form onSubmit={preventSubmitEvent}>
        <div hidden={emailAuthNumberHidden}>
          <input
            onChange={handleChangeAuthNumberValue}
            placeholder="인증번호"
          />
          <button onClick={handleCheckAuthNumber}>이메일 인증</button>
          <h5 hidden={unAuthMessageHidden}>인증번호가 올바르지 않습니다.</h5>
          <h5 hidden={authMessageHidden}>인증 완료.</h5>
        </div>
      </form>
      <div>
        <span>비밀번호</span>
      </div>
      <form onSubmit={preventSubmitEvent}>
        <div>
          <input onChange={handleChangePasswordValue} placeholder="비밀번호" />
        </div>

        <button onClick={doRegist}>회원가입 하기</button>
      </form>
    </div>
  );
};

export default SignUp;
