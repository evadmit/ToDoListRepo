import React, { Component } from 'react';
import NewToDoComponent from '../../components/NewToDoComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import { validate } from '../../utils/validation';
import { saveToken } from '../../utils/storage';
import { NavigationActions, StackActions } from 'react-navigation';

class NewToDoContainer extends Component {


    state = { isLoading: false }
    onSuccess = (newtodo) => {
        //save local
        this.setState({ isLoading: false })
      
    }
    onError = (error) => {
        this.setState({ isLoading: false })
        console.log(error)

    }
    newToDo = (params) => {
        this.setState({ isLoading: true })
    
        this.props.actions.todoActions.addTodo({  title: params.title, description: params.description, isCompleated: params.isCompleated, image: params.image , userEmail: params.userEmail, coordinates: params.coordinates}, this.onSuccess, this.onError)
    }
    render() {
        return (
            <NewToDoComponent
            addTodo={this.addTodo}
            />
        );
    }
}
    const mapStateToProps = (state) => {
        return {}
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            actions: {
                register: bindActionCreators(registerActions, dispatch)
            }
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);




