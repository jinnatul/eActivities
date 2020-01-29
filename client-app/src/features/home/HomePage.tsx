import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user} = rootStore.userStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/items/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    eActivities
                </Header>
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities...
                        </Button>                        
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header as='h2'color='green' content='Welcome to eActivities' />
                        <Button as={Link} to='/login' size='huge' inverted>
                            LoGIn
                        </Button>
                        <Button as={Link} to='/register' size='huge' inverted>
                            ReGistration
                        </Button>
                    </Fragment>
                )}

            </Container>
        </Segment>
    )
}

export default HomePage;
