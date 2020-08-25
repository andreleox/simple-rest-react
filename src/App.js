import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  // Getting data from API
  useEffect(() => {
    api.get("repositories").then(response => 
      setRepositories(response.data))}, []);
  console.log(repositories)
  

  async function handleAddRepository() {
    
    const newRepository = {
      title: "Neco Repo", 
      url: "mdsasf url", 
      techs: ["teconologia", "tech2", "tech3"], 
    }
    
    const response = await api.post("repositories", newRepository)
  
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id ))    
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map( (repository) => 
          <li key={repository.id}>
             {repository.title} 
          
          <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
          
          </li>     
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
