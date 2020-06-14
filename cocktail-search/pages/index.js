import Head from 'next/head';
import * as firebase from 'firebase';
import { FirebaseWrapper } from '../lib/db/firebase';
import axios from 'axios';
import { config } from '../lib/db/index';
import { getIngredients } from '../lib/db/drinkDb';

export default class Index extends React.Component {
  static async getInitialProps() {
    FirebaseWrapper.GetInstance().Initialize(config);
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
  }

  render() {
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>;
  }
}
