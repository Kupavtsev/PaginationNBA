import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const App = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getPlayerData = async () => {
    try {
      const res = await axios.get(
        "http://nba-players.herokuapp.com/players-stats"
      );
      setPlayers(res.data);
      setLoading(true);
    } catch (e) {
      console.log(e)
    }
  };

  const columns = [
    { dataField: "name", text: "Player Name"},
    { dataField: "points_per_game", text: "Points Per Game"},
    { dataField: "team_name", text: "Player Team"}
  ]

  useEffect(() => {
    getPlayerData()
  }, []);


  //https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html
  return (
    <div className="App">
      {loading
      ? (
     <BootstrapTable 
     keyField="name"
     data={players}
     columns={columns}
     pagination={paginationFactory()}
     />)
      : (
        <ReactBootStrap.Spinner animation="border" />
      )
      }
    </div>
  );
}

export default App;
