import { observable, action, computed, configure, runInAction } from 'mobx'
import { createContext, SyntheticEvent } from "react"
import { IActivity } from '../model/activity'
import agent from '../api/agent';

configure({enforceActions: 'always'});

export class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity [] = [];
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities...', () => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
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
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                });
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
            runInAction('create activity...', () => {
            this.activityRegistry.set(activity.id, activity);
            this.editMode = false;
            this.submitting = false;
            });
        } catch (error) {
            runInAction('create activity error', () => {
            this.submitting = false;
            });
            console.log(error);
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity...', () => {
            this.activityRegistry.set(activity.id, activity);
            this.activity = activity;
            this.editMode = false;
            this.submitting = false;
            });
        } catch (error) {
            runInAction('editing activity error', () => {
            this.submitting = false;
            });
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

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = null;
    };

    @action openEditForm = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action cancelSelectedActivity = () => {
        this.activity = null;
    };

    @action cancelOpenForm = () => {
        this.editMode = false;
    };

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    };
}

export default createContext(new ActivityStore());