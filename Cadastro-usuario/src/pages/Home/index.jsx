import {useEffect, useState, useRef} from 'react'
import "./style.css";
import Lixo from "../../assets/Lixo.svg";
import api from "../../services/api"

function Home() {
const [users, setUsers] = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

  async function getUsers(){
     const usersFromApi = await api.get('/user')

     setUsers(usersFromApi.data)
  }
  async function createUsers(){

    await api.post('/user', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })


    getUsers()
  }

  async function deletUsers(id){
    await api.delete(`/user/${id}`)

    getUsers()
 }

  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <div className="container">
      <form className="formulario">
        <h1>Cadastro De Usuarios</h1>
        <input placeholder="Nome" name="Nome" type="text" ref={inputName}/>
        <input placeholder="Idade" name="Idade" type="number" ref={inputAge}/>
        <input placeholder="E-mail" name="Email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>Cadastrar Usuario</button>
      </form>

      {users.map((users) => (
        <div key={users.id} className="card">
          <div>
            <p>Nome: <span>{users.name} </span></p>
            <p>Idade: <span>{users.age} </span></p>
            <p>Email: <span>{users.email} </span></p>
          </div>
          <button onClick={() => deletUsers(users.id)} className="button">
            <img src={Lixo}/>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
