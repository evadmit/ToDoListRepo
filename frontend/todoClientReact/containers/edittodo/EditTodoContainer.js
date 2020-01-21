import React, { Component } from 'react';
import EditToDoComponent from '../../components/EditToDoComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import { NavigationActions, StackActions } from 'react-navigation';

class EditTodoContainer extends Component{

    state = { isLoading: false };

    onSuccess = (todo) => {
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

    editTodo = (params) => {
        this.setState({ isLoading: true })

        this.props.actions.editTodo.editTodo( {
            _id: params._id,
            title: params.title,
            description: params.description, 
            isCompleted: params.isCompleted, 
            image: params.image, 
            userEmail: params.userEmail, 
            coordinates: params.coordinates 
        }, this.onSuccess, this.onError);

    }

    render() {
        return (
            <EditToDoComponent
                editTodo={this.editTodo}
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
            editTodo: bindActionCreators(todoActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoContainer);