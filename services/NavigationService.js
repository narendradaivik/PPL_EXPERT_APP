import { CommonActions } from '@react-navigation/native';

let navigationRef;

export function setNavigationReference(ref) {
  navigationRef = ref;
}

export function navigate(screenName, params) {
  navigationRef.dispatch(
    CommonActions.navigate({
      name: screenName,
      params: params,
    })
  );
}
