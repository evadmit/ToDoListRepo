import React, { Component } from 'react';
import NewToDoComponent from '../../components/NewToDoComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import { NavigationActions, StackActions } from 'react-navigation';

class NewToDoContainer extends Component {


    state = { isLoading: false };

    onSuccess = (newtodo) => {

        this.setState({ isLoading: false });
        const { navigation } = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'ToDoList' }),
            ],
        });
        navigation.dispatch(resetAction);

    }
    onError = (error) => {
        this.setState({ isLoading: false })
        console.log(error)

    }

    addTodo = (params) => {
        this.setState({ isLoading: true })

        this.props.actions.addTodo.addTodo({ 
            title: params.title,
            description: params.description, 
            isCompleated: params.isCompleated, 
            image: params.image, 
            userEmail: params.userEmail, 
            coordinates: params.coordinates 
        }, this.onSuccess, this.onError);

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
            addTodo: bindActionCreators(todoActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewToDoContainer);




