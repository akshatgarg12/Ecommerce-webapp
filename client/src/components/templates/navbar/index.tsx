import { Button, Menu, Input, Icon } from 'semantic-ui-react'


const Navbar: React.FC<any> = () => {
  return (
    <Menu size='huge'>
      <Menu.Item>
          <img src='https://react.semantic-ui.com/logo.png' />
      </Menu.Item>
      <Menu.Item>
        <Input className='icon' icon='search' placeholder='Search...' />
      </Menu.Item>
      <Menu.Item>
        <h4>Birla Institute of Technology</h4>
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item>
          <Icon name="shopping cart" size="large" />
        </Menu.Item>
        <Menu.Item>
          <Button primary>Sign Up</Button>
        </Menu.Item>
      </Menu.Menu>
  </Menu>
  );
}
 
export default Navbar;