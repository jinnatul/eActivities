import React from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/items/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    eActivities
                </Header>
                <Header as='h2' inverted content='Welcome to eActivities' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Go to the activities!
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage;
