import Storage from '../api/Storage';

export default async function forceAuth(nav) {
    const jwt = await Storage.getJwt();
    if(!jwt) {
        console.log(nav);
        return nav.navigate("AuthChoose");
    }
}