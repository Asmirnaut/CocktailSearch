// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from 'firebase';
import { FirebaseWrapper } from '../../lib/db/firebase';

export default async (req, res) => {
  FirebaseWrapper.GetInstance().Initialize(config);
  try {
    const allDrinks = await FirebaseWrapper.GetInstance().GetAllDrinks();
    console.log(allDrinks);
    res.json(allDrinks);
  } catch (error) {
    console.log(error);
  }
};
