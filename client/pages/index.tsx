import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import {SERVER_URL, SELF_URL} from '../src/constants/dev';
import { Button, Dropdown, Menu } from 'semantic-ui-react'
export const getStaticProps:GetStaticProps = async (context) =>{
  const serverData = await (await fetch(SERVER_URL)).json();
  const lambdaData = await (await fetch(SELF_URL + '/api/hello')).json();
  console.log(serverData);
  return {
    props:{
      person:[...serverData, lambdaData],
    }
  }
}

const Home:React.FC<any> = ({person}) => {
  const [activeItem, setActiveItem] = useState('home');
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return <div>
    <Button>Click Here</Button>
    <Menu size='huge'>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={handleItemClick}
        />

        <Menu.Menu position='right'>
          <Dropdown item text='Language'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button primary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    {person.map((per, id) => {
      return <h1>{per.name}</h1>
    })}
  </div>
}
export default Home;