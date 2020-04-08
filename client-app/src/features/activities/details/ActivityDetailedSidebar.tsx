import React, { Fragment } from 'react'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IAttendee } from '../../../app/model/activity';
import { observer } from 'mobx-react-lite';

interface IProps {
    attendees: IAttendee[];
}

const ActivityDetailedSidebar: React.FC<IProps> = ({attendees}) => {
    return (
        <Fragment>
            <Segment
            textAlign='center'
            style={{ border: 'none' }}
            attached='top'
            secondary
            inverted
            color='teal'
            >
            {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
            <List relaxed divided>
                {attendees.map((attende) => (
                    <Item key={attende.userName} style={{ position: 'relative' }}>
                    {attende.isHost && 
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                        Host
                    </Label>}
                    <Image size='tiny' src={attende.image || '/items/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                    <Link to={`/profile/${attende.userName}`}>{attende.displayName}</Link>
                        </Item.Header>
                        <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                    </Item.Content>
                    </Item>
                ))}
            </List>
            </Segment>
        </Fragment>
    )
}

export default observer(ActivityDetailedSidebar);