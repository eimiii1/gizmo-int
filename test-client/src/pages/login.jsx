import { useState} from "react";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('buton clicked')

    try {
      const res = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({username, password})
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Login failed')
      }
      
      const data = await res.json()
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('Login successful:', data.user)
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <>
    <div>
      <div>
        <label>Username</label>
        <input 
        placeholder="enter your username" 
        required 
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
         />
      </div>
      <div>
        <label>password</label>
        <input 
        placeholder="enter your password" 
        required 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
         />
      </div>
      <button 
      type="button"
      onClick={handleLogin}
      >Login</button>
    </div>
    </>
  )  
}

export default Login;