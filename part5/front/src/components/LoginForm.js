import React from 'react'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={props.handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={props.username}
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id='loginButton' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm