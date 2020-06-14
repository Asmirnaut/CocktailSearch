import Head from 'next/head';
import { FirebaseWrapper } from '../lib/db/firebase';
import { config } from '../lib/db/index';
import Button from '@material-ui/core/Button';

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      ingredients: [],
      mainIngredients: [],
    };
    this.populateMains = this.populateMains.bind(this);
  }

  async componentDidMount() {
    try {
      FirebaseWrapper.GetInstance().Initialize(config);
      const allDrinks = await FirebaseWrapper.GetInstance().GetAllDrinks();
      const allIngredients = await FirebaseWrapper.GetInstance().GetAllIngredients();

      if (allDrinks && allIngredients) {
        this.setState({ drinks: allDrinks, ingredients: allIngredients });
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
    console.log('state', this.state.mainIngredients);
    return (
      <div className="container">
        <Head>
          <title>CocktailSearch</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/styles.css" />
        </Head>

        <main>
          <Button variant="contained" color="primary">
            Click Me
          </Button>
          <h1 className="title">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </main>
      </div>
    );
  }
}
