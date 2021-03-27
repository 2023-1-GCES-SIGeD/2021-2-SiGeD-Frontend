import React, { useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { BsThreeDots, BsPencil } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteUser } from '../../Services/Axios/userServices';
import {
  PersonDataBox, TableContent, Box, Ul, Li, Icon, Button, Content, P,
  TableContainer, ImageUser, DotContent,
} from '../PersonData/Style';
import colors from '../../Constants/colors';

const PersonalData = ({ user, getUsers }) => {
  const [boxState, setBoxState] = useState(false);

  const closeBox = () => {
    if (boxState) {
      setBoxState(false);
    }
  };

  const ClickDeleteUser = () => {
    deleteUser(user._id);
    getUsers();
  };

  return (

    <Content onMouseLeave={closeBox} onClick={closeBox}>
      <PersonDataBox>
        <ImageUser>
          <IoPersonCircleOutline size="100%" />
        </ImageUser>
        <TableContainer>
          <TableContent width={20}>
            <P>{user.name}</P>
          </TableContent>

          <TableContent width={25}>
            <P>{user.email}</P>
          </TableContent>

          <TableContent width={20}>
            <P>{user.role}</P>
          </TableContent>

          <TableContent width={15}>
            <P>{user.sector}</P>
          </TableContent>

          <TableContent width={15}>
            <P>{format(new Date(user.updatedAt), 'dd/MM/yyyy')}</P>
          </TableContent>

          <DotContent width={2} justifycontent="flex-end">
            <P><BsThreeDots onClick={() => { setBoxState(!boxState); }} /></P>
          </DotContent>
        </TableContainer>
      </PersonDataBox>

      {boxState ? (
        <Box>
          <Ul>
            <Li>
              <Button>
                <Link
                  to={`/usuarios/editar/${user._id}`}
                  id={user._id}
                  style={{ color: colors.text, textDecorationLine: 'none', fontFamily: 'Montserrat' }}
                >
                  Editar
                </Link>
              </Button>
              <Icon>
                <Link
                  to={`/usuarios/editar/${user._id}`}
                  id={user._id}
                  style={{ color: colors.text, textDecorationLine: 'none', fontFamily: 'Montserrat' }}
                >
                  <BsPencil />
                </Link>
              </Icon>
            </Li>
            <Li>
              <Button onClick={ClickDeleteUser}>
                Desativar
              </Button>
              <Icon onClick={ClickDeleteUser}>
                <FaRegTrashAlt />
              </Icon>
            </Li>
          </Ul>
        </Box>
      ) : null}
    </Content>
  );
};

export default PersonalData;
