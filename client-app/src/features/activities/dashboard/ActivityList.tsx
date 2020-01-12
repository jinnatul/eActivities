import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { Link } from 'react-router-dom';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    const {activitiesByDate, deleteActivity, submitting, target} 
        = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity}/>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList)