 import { useState } from "react"
import { DefaultLayout } from "../layout/DefaultLayout"
import { useAuth } from "../auth/authProvider"
import { Navigate, useNavigate } from "react-router-dom"
import { API_URL } from "../auth/constants"
import { AuthResponseError } from "../types/types"  
 const Login =()=>{
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorResponse, setErrorResponse] = useState("")
  const auth = useAuth()
  const goTo = useNavigate()
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
  
    try {
      const response = await fetch(`${API_URL}login`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
           username, password
        })
      })

      if(response.ok){
        console.log("login successfull");
        setErrorResponse("")
        goTo("/dashboard")
      }else{
        console.log("algo ocurrió");
        const json = await response.json() as AuthResponseError
        setErrorResponse(json.body.error)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  if( auth.isAuthenticated) return <Navigate to="/dashboard"></Navigate>
    return(<DefaultLayout>
    <form  className="form" onSubmit={handleSubmit}>
      <h1>Inicia Sesión</h1>
      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
      <label>Username</label>
      <input type="text" value={username} onChange={e=>setUsername(e.target.value)}></input>
      <label>Password</label>
      <input type="text" value={password} onChange={e=>setPassword(e.target.value)}></input>
      <button>INGRESA</button>
    </form>
    </DefaultLayout>)
 }

 export default Login