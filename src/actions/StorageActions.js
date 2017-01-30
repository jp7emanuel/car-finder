import firebaseApp from '../../server/database/firebase_connection';
import uuid from 'uuid';
import {
  UPLOAD_IMAGE
} from './types';

export function uploadImage(image) {
  return {
    type: UPLOAD_IMAGE,
    payload: firebaseApp.storage().ref().child(uuid.v4()).put(image)
  };
};
