import { useState, useEffect } from "react";

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log('buton clicked')

    try {
      const res = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({username, email, password})
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Registration failed')
      }
      
      const data = await res.json()
      console.log('Registration successful:', data.message)
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
        <label>Email Address</label>
        <input 
        placeholder="enter your email" 
        required 
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
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
      onClick={handleRegister}
      >Register</button>
    </div>
    </>
  )  
}

export default Register;