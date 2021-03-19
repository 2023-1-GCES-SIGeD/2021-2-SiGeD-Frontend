import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonalData from '../../Components/PersonalData';
import GenericListScreen from '../../Components/GenericListScreen';
import {
  H1, TableHeader, P, Bar, TableTitle,
} from './style';

const novoUsuario = () => { };

const ListScreen = () => {
  const [word, setWord] = useState();
  const [filterUsers, setFilterUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/users', { headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTM2NTUxOTQ0OGVlMDA1NTQzZWUzZSIsImlhdCI6MTYxNjEzOTcyMSwiZXhwIjoxNjE2MTM5OTYxfQ.Zgl5ALv_6aRj1_17XIhtMSwgEAXqQShw6zS2T2hxlq8' } })
      .then((response) => setUsers(response.data));
  }, []);

  useEffect(() => {
    setFilterUsers(
      users.filter((user) => user.name.toLowerCase().includes(word?.toLowerCase())),
    );
  }, [word]);

  useEffect(() => {
    setFilterUsers(users);
  }, [users]);

  const listUsers = () => {
    console.log(filterUsers);
    if (users.length === 0) {
      return <H1>Sem resultados</H1>;
    }
    if (filterUsers.length === 0) {
      return <H1>Sem resultados</H1>;
    }
    return filterUsers.map((user) => <PersonalData user={user} key={user._id} />);
  };

  return (
    <GenericListScreen
      ButtonTitle="Novo Usuário"
      ButtonFunction={novoUsuario}
      PageTitle="Usuários"
      SearchWord={word}
      setWord={setWord}
      ListType={listUsers()}
      redirectTo="/usuarios"
    >
      <TableHeader>
        <TableTitle width={25}>
          <P>Nome</P>
        </TableTitle>
        <Bar />
        <TableTitle width={25}>
          <P>Email</P>
        </TableTitle>
        <Bar />

        <TableTitle width={20}>
          <P>Cargo</P>
        </TableTitle>
        <Bar />

        <TableTitle width={15}>
          <P>Setor</P>
        </TableTitle>
        <Bar />
        <TableTitle width={15}>
          <P>Ult. Atualização</P>
        </TableTitle>
      </TableHeader>
    </GenericListScreen>
  );
};

export default ListScreen;
