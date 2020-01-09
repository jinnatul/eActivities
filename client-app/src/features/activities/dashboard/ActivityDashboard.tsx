import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/model/activity'

interface IProps {
    activities: IActivity[]
}

export const ActivityDashboard: React.FC<IProps> = (props) => {
    return (
        <Grid>
            <Grid.Column width={10}>
               <List>
                   {props.activities.map((activity) => (
                     <List.Item key={activity.id}>{activity.title}</List.Item>
                  ))}
                </List>
            </Grid.Column>
        </Grid>
    )
}
