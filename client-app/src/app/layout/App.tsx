import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Header, Icon, List} from 'semantic-ui-react';
import { IActivity } from '../model/activity';

const App = () => {
  
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/activities')
      .then((response) => {
      setActivities(response.data)
    });
  }, []);

  return (
    <div>
      <Header as='h2' >
        <Icon name='plug'/>
        <Header.Content>eActivities</Header.Content>
      </Header>
      <List>
        {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
  
}

export default App;
