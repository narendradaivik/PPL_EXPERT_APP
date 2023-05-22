import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let navigationRef;

export function setNavigationReference(ref) {
  navigationRef = ref;
}

export function navigate(screenName, params) {
  if (navigationRef ) {
  navigationRef.dispatch(
    CommonActions.navigate({
      name: screenName,
      params: params,
    })
  );
}else{
  AsyncStorage.setItem('NotificationNavigation', screenName);
}
}
