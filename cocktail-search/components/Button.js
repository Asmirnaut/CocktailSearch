import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { FirebaseWrapper } from '../lib/db/firebase';
import { useRouter } from 'next/router';
import DrinkCard from './DrinkCard';
import Drinks from '../pages/drinks';

const image = [
  {
    url: 'https://cdn.wallpapersafari.com/25/76/wko8QG.jpg',
    title: 'Drink',
    width: '100%',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    width: 'auto',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      color: '#1847c7',
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));
export const drink = '';

export default function ButtonBases(props) {
  const router = useRouter();

  const handleClick = async (e, ingredient) => {
    e.preventDefault();
    drink = ingredient;
    router.push({
      pathname: '/drinks',
    });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {image.map((image) => (
        <ButtonBase
          focusRipple
          key={props.name}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onclick={(e) => handleClick(e, props.name)}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              <p id="textshadow">{props.name}</p>
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}
