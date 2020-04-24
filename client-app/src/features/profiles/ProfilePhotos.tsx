import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadPhoto, uploadingPhoto } = rootStore.profileStore;
    const [ addPhotoMode, setAddPhotoMode ] = useState(false);

    const handleUploadPhoto = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false))
    }
    
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
                    {(addPhotoMode && isCurrentUser) ? (
                         <PhotoUploadWidget uploadPhoto={handleUploadPhoto} loading={uploadingPhoto}/>
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
export default observer(ProfilePhotos)