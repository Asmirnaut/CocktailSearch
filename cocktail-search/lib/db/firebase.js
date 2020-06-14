import * as firebase from 'firebase';
import 'firebase/firestore';

export class FirebaseWrapper {
  constructor() {
    this.initialized = false;
    this._firebaseInstance = null;
    this._firebaseWrapperInstance = null;
    this._firestore = null;
  }

  Initialize(config) {
    if (!this.initialized) {
      this._firebaseInstance = firebase.initializeApp(config);
      this._firestore = firebase.firestore();
      this.initialized = true;
      console.log('just initialized');
    } else {
      console.log('already initialized');
    }
  }

  static GetInstance() {
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper();
    }

    return this._firebaseWrapperInstance;
  }

  async CreateDrink(collectionPath, doc) {
    try {
      const ref = this._firestore.collection(collectionPath).doc(doc.idDrink);
      return await ref.set({
        name: doc.strDrink,
        image_url: doc.strDrinkThumb,
        id: doc.idDrink,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async CreateIngredients(collectionPath, doc) {
    try {
      const ref = this._firestore.collection(collectionPath).doc(doc.idDrink);
      return await ref.set({
        name: doc.strDrink,
        image: doc.strDrinkThumb,
        drink_id: doc.idDrink,
        glass_type: doc.strGlass,
        instructions: doc.strInstructions,
        ing_1: {
          name: doc.strIngredient1,
          amount: doc.strMeasure1,
        },
        ing_2: {
          name: doc.strIngredient2,
          amount: doc.strMeasure2,
        },
        ing_3: {
          name: doc.strIngredient3,
          amount: doc.strMeasure3,
        },
        ing_4: {
          name: doc.strIngredient4,
          amount: doc.strMeasure4,
        },
        ing_5: {
          name: doc.strIngredient5,
          amount: doc.strMeasure5,
        },
        ing_6: {
          name: doc.strIngredient6,
          amount: doc.strMeasure6,
        },
        ing_7: {
          name: doc.strIngredient7,
          amount: doc.strMeasure7,
        },
        ing_8: {
          name: doc.strIngredient8,
          amount: doc.strMeasure8,
        },
        ing_9: {
          name: doc.strIngredient9,
          amount: doc.strMeasure9,
        },
        ing_10: {
          name: doc.strIngredient10,
          amount: doc.strMeasure10,
        },
        ing_11: {
          name: doc.strIngredient11,
          amount: doc.strMeasure11,
        },
        ing_12: {
          name: doc.strIngredient12,
          amount: doc.strMeasure12,
        },
      });
    } catch (error) {}
  }

  async GetDrinkId() {
    try {
      const idArray = [];
      await this._firestore
        .collection('drinks')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            idArray.push(doc.id);
          });
        });
      return idArray;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllDrinks() {
    try {
      const ref = await this._firestore
        .collection()
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            return doc.data();
          });
        });
      return ref;
    } catch (error) {}
  }
}
