import { useState } from "react"
import { DefaultLayout } from "../layout/DefaultLayout"
import { useAuth } from "../auth/authProvider"
import { Navigate, useNavigate } from "react-router-dom"
import { API_URL } from "../auth/constants"
import {AuthResponseError} from "../types/types"
const SignUp  =()=>{

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorResponse, setErrorResponse] = useState("")
  const auth = useAuth()
  const goTo = useNavigate()
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}signup`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name, username, password
        })
      })

      if(response.ok){
        console.log("el usuario se creó correctamente");
        setErrorResponse("")
        goTo("/login")
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
      <form className="form" onSubmit={handleSubmit}>
        <h1>Registrate</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>nombre</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)}></input>
        <label>username</label>
        <input type="text" value={username} onChange={e=>setUsername(e.target.value)}></input>
        <label>contraseña</label>
        <input type="text" value={password} onChange={e=>setPassword(e.target.value)}></input>
        <button>Guardar</button>
      </form>
      </DefaultLayout>)
 }

 export default SignUp