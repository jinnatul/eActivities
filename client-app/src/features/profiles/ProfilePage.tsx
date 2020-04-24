import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

interface RouterParams {
    username: string
}

interface IProps extends RouteComponentProps<RouterParams>{}

const ProfilePage: React.FC<IProps> = ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadingProfile, profile, loadProfile} = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username)
    }, [loadProfile, match])

    if (loadingProfile) return <LoadingComponent content='Loading Profile...'/>

    return (
        <Grid.Column width={16}>
            <ProfileHeader profile={profile!}/>
            <ProfileContent/>
        </Grid.Column>
    )
}

export default observer(ProfilePage);