import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/model/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { TextAreaInput } from '../../../app/common/form/TextAreaInput';

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

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect(() => {
        if(match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(
                () => initialeFormState && setActivity(initialeFormState)
            );
        }
        return (() => {
            cleanActivity()
        })
    }, [loadActivity, match.params.id, cleanActivity, initialeFormState, activity.id.length]); 
    
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
        console.log(values);
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
                                name='title' 
                                placeholder='Title' 
                                value={activity.title}
                                component={TextInput}
                            />
                            <Field 
                                name='description' 
                                placeholder='Description' 
                                rows={3}
                                value={activity.description}
                                component={TextAreaInput}
                            />
                            <Field 
                                name='category' 
                                placeholder='Category' 
                                value={activity.category}
                                component={TextInput}
                            />
                            <Field 
                                name='date' 
                                placeholder='Date' 
                                value={activity.date}
                                component={TextInput}
                            />
                            <Field 
                                name='city' 
                                placeholder='City' 
                                value={activity.city}
                                component={TextInput}
                            />
                            <Field 
                                name='venue' 
                                placeholder='Venue' 
                                value={activity.venue}
                                component={TextInput}
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