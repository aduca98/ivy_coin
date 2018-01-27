// @flow
import { NavigationActions } from "react-navigation"

export default class NavigationHelpers {
    static reset(navigation, routeName, key = null) {
        const action = NavigationActions.reset({
            index: 0,
            key,
            actions: [
                NavigationActions.navigate({ routeName })
            ]
        });
        navigation.dispatch(action);
    }
}
