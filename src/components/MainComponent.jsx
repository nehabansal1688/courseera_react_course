import React, { Component } from 'react';
import Header from './HeaderComponent.jsx';
import Menu from './MenuComponent.jsx';
import DishDetail from './DishDetailComponent.jsx';
import Footer from './FooterComponent.jsx';
import Home from './HomeComponent.jsx';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Contact from './ContactComponent.jsx';
import About from './AboutComponent.jsx';
import {addComment, fetchDishes} from '../redux/actionCreators';


import {connect} from 'react-redux';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

const mapDispatchToProps = (dispatch) => ({
  addComment:(dishId, rating,author,comment) => dispatch(addComment(dishId, rating,author,comment)),
  fetchDishes:() => {dispatch(fetchDishes())}
});
class Main extends Component {
    constructor(props){
      super(props);
    }
    componentDidMount() {
      this.props.fetchDishes();
    }
     render() {
    
   const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMsg = {this.props.dishes.errMsg}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail 

            dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading = {this.props.dishes.isLoading}
            errMsg = {this.props.dishes.errMsg}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment = {this.props.addComment}
         />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route path="/aboutus" component={() => <About leaders ={this.props.leaders} /> }/>
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" />
        </Switch>
       
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

