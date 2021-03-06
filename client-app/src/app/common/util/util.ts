import { IActivity, IAttendee } from "../../model/activity";
import { IUser } from "../../model/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    //const timeString = time.getHours() + ':' + time.getMinutes() + ':00';
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const dateString = `${year}-${month}-${day}`;
    const dateString = date.toISOString().split('T')[0];
    const timeString = time.toISOString().split('T')[1];

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

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        userName: user.userName,
        image: user.image!
    }
}