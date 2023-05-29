import {CommonActions, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let navigationRef;

export function setNavigationReference(ref) {
  navigationRef = ref;
}

export function navigate(screenName, params) {
  if (navigationRef) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: screenName,
        params: params,
      }),
    );
  } else {
    AsyncStorage.setItem('NotificationNavigation', screenName);
  }
}

export function replace(screenName, params) {
  if (navigationRef) {
    navigationRef.dispatch(StackActions.replace(screenName, params));
  }
}
