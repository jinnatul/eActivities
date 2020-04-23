import React, { useContext } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { Tab, Header, Card, Image } from 'semantic-ui-react';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile } = rootStore.profileStore;
    return (
        <Tab.Pane>
            <Header icon='image' content='Photos'/>
            <Card.Group itemsPerRow={4}>
                {profile && profile.photos.map(photo => (
                    <Card key={photo.id}>
                        <Image src={photo.url}/>
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    )
}
export default ProfilePhotos