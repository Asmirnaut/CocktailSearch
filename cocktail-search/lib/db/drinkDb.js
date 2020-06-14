import axios from 'axios';
import { FirebaseWrapper } from './firebase';

export const setDrinks = async () => {
  const drinks = await axios({
    method: 'get',
    url: `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic`,
  });
  drinks.data.drinks.map(async (drinks) => {
    await FirebaseWrapper.GetInstance().CreateDrink('drinks', drinks);
  });
};

export const getIngredients = async (drinkId) => {
  try {
    const ingredientData = await axios({
      method: 'get',
      url: `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drinkId}`,
    });
    let ingredients = ingredientData.data.drinks;
    //console.log(ingredients[0].strDrink);
    if (ingredients[0]) {
      await FirebaseWrapper.GetInstance().CreateIngredients(
        'ingredients',
        ingredients[0]
      );
    }
  } catch (error) {
    console.log(error);
  }

  export const setIngredients = async () => {
    try {
      const drinksId = await FirebaseWrapper.GetInstance().GetDrinkId();
      let IngPromise = drinksId.map((id) => {
        setTimeout(async () => {
          await getIngredients(id);
        }, 4000);
      });

      await Promise.all(IngPromise);
    } catch (error) {
      console.log(error);
    }
  };
};
