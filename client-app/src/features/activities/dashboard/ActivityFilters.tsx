import React, { Fragment } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';

const ActivityFilters = () => (
  <Fragment>
    <Menu vertical size={'large'} style={{ width: '100%', marginTop: 30 }}>
      <Header icon={'filter'} attached color={'green'} content={'Filters'} />
      <Menu.Item color={'green'} name={'all'} content={'All Activities'} />
      <Menu.Item color={'green'} name={'username'} content={"I'm Going"} />
      <Menu.Item color={'green'} name={'host'} content={"I'm hosting"} />
    </Menu>
    <Header icon={'calendar'} attached color={'green'} content={'Select Date'} />
    <Calendar />
  </Fragment>
);

export default ActivityFilters;