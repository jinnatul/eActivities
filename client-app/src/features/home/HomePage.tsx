import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user} = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/items/logo.png' alt='logo' style={{marginBottom: 12, borderRadius: 100}}/>
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
                        <Button onClick={() => openModal(<LoginForm/>)} size='huge' inverted>
                            LoGIn
                        </Button>
                        <Button onClick={() => openModal(<RegisterForm/>)} size='huge' inverted>
                            ReGistration
                        </Button>
                    </Fragment>
                )}

            </Container>
        </Segment>
    )
}

export default HomePage;
