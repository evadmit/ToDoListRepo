import React, { Component } from "react";
import ToDoListComponent from '../../components/ToDoListComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as todoActions from '../../actions/todoActions';

class ToDoListContainer extends Component {

    state = { isLoading: false, todos: {} };

    loadTodos = (onSuccess, onError) => {

        this.setState({ isLoading: true })
        try {
            this.props.actions.loadTodos.loadTodos(onSuccess, onError);

        } catch (error) {
            console.log("loadTodos error", error);
        }

    }

    deleteTodo = (params, onSuccess, onError) => {

        this.setState({ isLoading: true })
        try {
            this.props.actions.loadTodos.deleteTodo(params, onSuccess, onError);

        } catch (error) {
            console.log("deleteTodo error", error);
        }

    }

    render() {
        return (
            <ToDoListComponent
                loadTodos={this.loadTodos}
                deleteTodo={this.deleteTodo}
            />
        );
    }
}
const mapStateToProps = (state) => {
    const todoList = state.todo.toDoListReducer.todos;
    return {
        todo: todoList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadTodos: bindActionCreators(todoActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListContainer);


