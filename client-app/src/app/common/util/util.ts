import { IActivity } from "../../model/activity";
import { IUser } from "../../model/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
}

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.userActivities.some(un => un.userName === user.userName);
    activity.isHost = activity.userActivities.some(
        un => un.userName === user.userName && 
        un.isHost
    );
    return activity;
}