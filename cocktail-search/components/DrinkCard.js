import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const createIngredients = () => {
    let arr = [];
    for (let key in props.drink) {
      if (key[1] === 'n' && key[2] === 'g') {
        if (props.drink[key] !== undefined) {
          if (props.drink[key].name !== null) {
            arr.push(
              <li>
                {props.drink[key].name} : {props.drink[key].amount}
              </li>
            );
          }
        } else {
          continue;
        }
      }
    }
    return arr;
  };

  return (
    <div id="drink-card">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              id="avatar"
              aria-label="recipe"
              className={classes.avatar}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.drink.name}
          subheader={props.drink.ing1.name}
        />
        <CardMedia
          className={classes.media}
          image={props.drink.image}
          title="props.name"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.drink.instructions}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            // onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon onClick={handleExpandClick} />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Ingredients</Typography>
            <Typography paragraph>
              <ul>{createIngredients()}</ul>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
