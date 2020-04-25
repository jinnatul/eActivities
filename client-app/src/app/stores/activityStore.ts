import { observable, action, computed, runInAction } from 'mobx'
import {  SyntheticEvent } from "react"
import { IActivity } from '../model/activity'
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { setActivityProps, createAttendee } from '../common/util/util';

export default class ActivityStore {

    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable loading = false;

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date!.getTime() - b.date!.getTime()
        )
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key: string]: IActivity[]}));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities...', () => {
                activities.forEach(activity => {
                    setActivityProps(activity, this.rootStore.userStore.user!);
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load activities error', () => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    };


    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity) {
            this.activity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    setActivityProps(activity, this.rootStore.userStore.user!);
                    this.activity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    this.loadingInitial = false;
                });
                return activity;
            } catch (error) {
                runInAction('getting activity error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    }

    @action cleanActivity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            const attendee = createAttendee(this.rootStore.userStore.user!);
            attendee.isHost = true;
            let attendees = [];
            attendees.push(attendee);
            activity.userActivities = attendees;
            activity.isHost = true;
            runInAction('create activity...', () => {
                this.submitting = false;
                this.activityRegistry.set(activity.id, activity);
            });
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction('create activity error', () => {
            this.submitting = false;
            });
            toast.error('Problem Submitting Data !');
            console.log(error);
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            console.log(activity)
            await agent.Activities.update(activity);
            runInAction('editing activity...', () => {
            this.activity = activity;
            this.submitting = false;
            this.activityRegistry.set(activity.id, activity);
            });
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction('editing activity error', () => {
            this.submitting = false;
            });
            toast.error('Problem Submitting Data !');
            console.log(error);
        }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('delete activity...', () => {
            this.activityRegistry.delete(id);
            this.submitting = false;
            this.activity = null;
            this.target = '';
            });
        } catch (error) {
            runInAction('delete activity error', () => {
            this.submitting = false;
            this.target = '';
            });
            console.log(error);
        }
    };

    @action attendActivity = async () => {
        const attendee = createAttendee(this.rootStore.userStore.user!);
        this.loading = true;
        try {
            await agent.Activities.attend(this.activity!.id);
            runInAction(() => {
                if (this.activity) {
                    this.activity.userActivities.push(attendee);
                    this.activity.isGoing = true;
                    this.activityRegistry.set(this.activity.id, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem for Joining Activity...!!!');
        }
    }

    @action cancelActivity = async () => {
        this.loading = true;
        try {
            await agent.Activities.unattend(this.activity!.id);
            runInAction(() => {
                if (this.activity) {
                    this.activity.userActivities = this.activity.userActivities.filter(
                        un => un.userName !== this.rootStore.userStore.user!.userName
                    );
                    this.activity.isGoing = false;
                    this.activityRegistry.set(this.activity.id, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem for Cancelling Activity...!!!');
        }
    }
}