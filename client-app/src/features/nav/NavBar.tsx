import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps {
  openCreateForm: () => void
}

export const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
      <Menu fixed='top' inverted>
        <Container>
            <Menu.Item header>
                <img src='/items/logo.png' alt='logo' style={{marginRight: '10px'}}/>
                eActivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button onClick={openCreateForm} positive content='Create Activity' />
            </Menu.Item>
        </Container>  
      </Menu>
    )
}
