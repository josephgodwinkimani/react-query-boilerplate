import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import UsersContainer from '../components/UsersContainer'
import './Home.css'

const Home = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Users</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <UsersContainer />
            </IonContent>
        </IonPage>
    )
}

export default Home
