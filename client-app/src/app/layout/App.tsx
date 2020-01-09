import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { IActivity } from '../model/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/activities')
      .then((response) => {
      setActivities(response.data)
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
        />
      </Container>
    </Fragment>
  );
  
}

export default App;
