import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivityFormValues } from '../../../app/model/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import { category } from '../../../app/common/options/categoryOptions';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';

interface DetailsParams {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
    match,
    history
}) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity, 
        editActivity, 
        submitting, 
        activity: initialeFormState,
        loadActivity,
        cleanActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivityFormValues>({
        id: undefined,
        title: '',
        description: '',
        category: '',
        date: undefined,
        time: undefined,
        city: '',
        venue: ''
    });
    
    useEffect(() => {
        if(match.params.id && !activity.id) {
            loadActivity(match.params.id).then(
                () => initialeFormState && setActivity(initialeFormState)
            );
        }
        return (() => {
            cleanActivity()
        })
    }, [
        loadActivity, 
        match.params.id, 
        cleanActivity, 
        initialeFormState, 
        activity.id
    ]); 
    
    // const handleSubmit = () => {
    //     if(activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     }
    //     else {
    //         editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;
        console.log(activity);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        onSubmit={handleFinalFormSubmit}
                        render = {({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                            <Field
                                component={TextInput}
                                name='title' 
                                placeholder='Title' 
                                value={activity.title}
                            />
                            <Field 
                                component={TextAreaInput}
                                name='description' 
                                placeholder='Description' 
                                rows={3}
                                value={activity.description}
                            />
                            <Field 
                                component={SelectInput}
                                name='category' 
                                placeholder='Category' 
                                value={activity.category}
                                options={category}
                            />
                            <Form.Group widths='equal'>
                                <Field 
                                    component={DateInput}
                                    name='date' 
                                    date={true}
                                    placeholder='Date' 
                                    value={activity.date}
                                />
                                <Field 
                                    component={DateInput}
                                    name='time'
                                    time={true} 
                                    placeholder='Time' 
                                    value={activity.time}
                                />
                            </Form.Group>
                            <Field 
                                component={TextInput}
                                name='city' 
                                placeholder='City' 
                                value={activity.city}
                            />
                            <Field 
                                component={TextInput}
                                name='venue' 
                                placeholder='Venue' 
                                value={activity.venue}
                            />
                            <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                            <Button 
                                onClick={() => history.push('/activities')} 
                                floated='right' 
                                type='button' 
                                content='Cancel' 
                            />
                        </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);