import Head from 'next/head';
import { FirebaseWrapper } from '../lib/db/firebase';
import { config } from '../lib/db/index';
import Button from '@material-ui/core/Button';
import ButtonBases from '../components/Button';

const image = [
  {
    url: '../public/neon-cocktail-image-1.jpeg',
    title: 'Drink',
    width: '30%',
  },
];

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
      mainIngredients: [],
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
    const { mainIngredients, ingredients } = this.state;
    return (
      <div className="container">
        <Head>
          <title>CocktailSearch</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/styles.css" />
        </Head>

        <main>
          <div id="buttonGrid">
            {mainIngredients &&
              mainIngredients.map((ing) => {
                return <ButtonBases name={ing} key={ing} id="grid" />;
              })}
          </div>
        </main>
      </div>
    );
  }
}

//create onclick function to take the ingrediant and display all drinks for that particular main ingredient
//create a title and navbar to wrap all components with for uniform style
//figure out a way to get all drinks/ingredients into one constant thing so that I don't have to make database calls every time I rerender the main page
//ie only make a database call for when I am looking for certain things
//Do I even need the regular drinks db when I can just use the ingredients thing instead since it technically has everything(that alone should cut my reads in half)
