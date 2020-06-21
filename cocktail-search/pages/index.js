import { FirebaseWrapper } from '../lib/db/firebase';
import { config } from '../lib/db/index';
import ButtonBases from '../components/Button';
import Layout from '../components/Layout';
import DrinkCard from '../components/DrinkCard';
import { useState, useEffect } from 'react';

export default function Index() {
  const [drinks, setDrinks] = useState([]);
  const [main, setMain] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [singleDrink, setSingleDrink] = useState([]);

  useEffect(() => {
    makeCall();
  }, []);

  useEffect(() => {
    populateMains();
  }, [ingredients]);

  const makeCall = async () => {
    try {
      FirebaseWrapper.GetInstance().Initialize(config);
      const allIngredients = await FirebaseWrapper.GetInstance().GetAllIngredients();
      if (allIngredients) {
        setIngredients(allIngredients);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const populateMains = () => {
    let mains = new Set();
    ingredients &&
      ingredients.forEach((ingredient) => {
        const name = ingredient.ing1.name;
        if (!mains.has(name)) {
          mains.add(name);
        }
      });
    setMain([...mains]);
  };

  return (
    <Layout
      setDrinks={setDrinks}
      drinks={ingredients}
      setDrink={setSingleDrink}
      drink={singleDrink}
    >
      <main className="main">
        <div id="buttonGrid">
          {drinks.length > 0 ? (
            drinks.map((drink) => {
              return <DrinkCard drink={drink} />;
            })
          ) : singleDrink.length > 0 ? (
            singleDrink.map((drink) => {
              return <DrinkCard drink={drink} />;
            })
          ) : main.length > 0 && main.length > 0 ? (
            main.map((ing) => {
              return (
                <ButtonBases
                  name={ing}
                  key={ing}
                  id="grid"
                  setDrinks={setDrinks}
                />
              );
            })
          ) : (
            <h1>Main Not Defined</h1>
          )}
        </div>
      </main>
    </Layout>
  );
}
