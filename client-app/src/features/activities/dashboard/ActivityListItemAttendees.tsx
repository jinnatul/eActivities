import React from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import { IAttendee } from '../../../app/model/activity'

interface IProps {
    attendees: IAttendee[];
}

const styles = {
    borderColor: 'green',
    borderWidth: 2
}

const ActivityListItemAttendees: React.FC<IProps> = ({attendees}) => {
    return (
        <List horizontal>
            {attendees.map((attendee) => (
                <List.Item key={attendee.userName}> 
                    <Popup
                        header={attendee.displayName}
                        trigger={
                            <Image 
                                size='mini' 
                                circular 
                                src={attendee.image || '/items/user.png'}
                                bordered
                                style={attendee.following ? styles: null}
                            />
                        }
                    />
                </List.Item>
            ))};
        </List>
    );
};

export default ActivityListItemAttendees;