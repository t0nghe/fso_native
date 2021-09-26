import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const tokenString = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );
    return JSON.parse(tokenString);
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`, JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    console.log('removeAccessToken called');
    await AsyncStorage.removeItem(
      `${this.namespace}:token`
    );
  }
}

// const tokenStorage = new AuthStorage();

export default AuthStorage;