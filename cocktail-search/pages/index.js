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
    };
    this.populateMains = this.populateMains.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  handleClick(ing) {}

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
      <Layout>
        <main className="main">
          <div id="buttonGrid">
            {mainIngredients &&
              mainIngredients.map((ing) => {
                return (
                  <ButtonBases
                    name={ing}
                    key={ing}
                    id="grid"
                    onClick={() => this.handleClick(ing)}
                  />
                );
              })}
          </div>
        </main>
      </Layout>
    );
  }
}

//create onclick function to take the ingrediant and display all drinks for that particular main ingredient
//create a title and navbar to wrap all components with for uniform style
//figure out a way to get all drinks/ingredients into one constant thing so that I don't have to make database calls every time I rerender the main page
//ie only make a database call for when I am looking for certain things
//Do I even need the regular drinks db when I can just use the ingredients thing instead since it technically has everything(that alone should cut my reads in half)
