import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
function RegisterPage() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ComfirmPassword, setComfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNamedHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setComfirmPassword(event.currentTarget.value)
  }

  //v.6 navigate
  let navigate = useNavigate();

  const onSubmitHandler = (event) => {
    //페이지 refresh 방지
    event.preventDefault();
    
    if(Password !== ComfirmPassword) {
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    //보내줄 data
    let body = {
        email: Email,
        password: Password,
        name: Name
    }
    //'registerUser'라는 action 보내기
    dispatch(registerUser(body))
    .then(response => {
        // console.log(response.data)
        if(response.payload.success) {
            navigate("/login")
        } else {
            alert("Faild to sign up!!")
        }
    })
}
return (
  <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
  }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmitHandler}
      >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>Name</label>
          <input type="text" value={Name} onChange={onNamedHandler} />
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler} />
          <label>Confirm Password</label>
          <input type="password" value={ComfirmPassword} onChange={onConfirmPasswordHandler} />
          <br/>
          <button type="submit">회원가입</button>
      </form>
  </div>
)
}
export default Auth(RegisterPage, false);