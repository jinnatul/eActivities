import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser } = rootStore.profileStore;
    const [ addPhotoMode, setAddPhotoMode ] = useState(true);
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon='image' content='Photos'/>
                    {isCurrentUser && 
                        <Button 
                            floated='right' 
                            basic 
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                         <PhotoUploadWidget/>
                    ) : (
                        <Card.Group itemsPerRow={4}>
                            {profile && profile.photos.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url}/>
                                    {isCurrentUser &&
                                        <Button.Group fluid widths={2}>
                                            <Button basic positive content='Main'/>
                                            <Button basic negative icon='trash'/>
                                        </Button.Group>
                                    }
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}
export default ProfilePhotos