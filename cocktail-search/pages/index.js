import { FirebaseWrapper } from '../lib/db/firebase';
import { config } from '../lib/db/index';
import ButtonBases from '../components/Button';
import Layout from '../components/Layout';
import DrinkCard from '../components/DrinkCard';

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
      mainIngredients: [],
      singleIngredient: '',
      drinks: [],
    };
    this.populateMains = this.populateMains.bind(this);
  }

  async componentDidMount() {
    try {
      FirebaseWrapper.GetInstance().Initialize(config);
      const allIngredients = await FirebaseWrapper.GetInstance().GetAllIngredients();

      if (allIngredients) {
        this.setState({ ...this.state, ingredients: allIngredients });
      }
      this.populateMains();
    } catch (error) {
      console.log(error);
    }
  }
  // handleClick = async (e, ingredient) => {
  //   e.preventDefault();
  //   const drinks = await FirebaseWrapper.GetInstance().DrinksByIngredients(
  //     ingredient
  //   );
  //   this.setState = {
  //     ...this.state,
  //     singleIngredient: ingredient,
  //     drinks,
  //   };
  // };

  populateMains() {
    let mains = new Set();
    this.state.ingredients &&
      this.state.ingredients.forEach((ingredient) => {
        const name = ingredient.ing1.name;
        if (!mains.has(name)) {
          mains.add(name);
        }
      });
    this.setState({
      ...this.state,
      mainIngredients: [...mains],
    });
  }

  render() {
    const {
      mainIngredients,
      ingredients,
      drinks,
      singleIngredient,
    } = this.state;

    return (
      <Layout>
        <main className="main">
          <div id="buttonGrid">
            {mainIngredients &&
              mainIngredients.map((ing) => {
                return <ButtonBases name={ing} key={ing} id="grid" />;
              })}
          </div>
        </main>
      </Layout>
    );
  }
}
