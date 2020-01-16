import React , { Component } from "react";
import ToDoListComponent from '../../components/ToDoListComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';

import * as todoActions from '../../actions/todoActions';

class ToDoListContainer extends Component {

    state = { isLoading: false , todos:{}};

    onSuccess = (data) => {
        console.log("data on success", data)
        this.setState({ isLoading: false });
        this.setState({ todos: data });
        const { navigation } = this.props;
        const resetAction = StackActions.reset({          
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'ToDoList' }),
            ], 
        });
        navigation.dispatch(resetAction);
          
            return data;
        }
   
    onError = (error) => {
        this.setState({ isLoading: false })
        console.log(error)

    }

 loadTodos = () =>{

        this.setState({isLoading : true})
        var res =this.props.actions.loadTodos.loadTodos(this.onSuccess, this.onError);
        console.log("loadTodos in container result", res);
     return res;
    }
    render() {
        return (
            <ToDoListComponent
            loadTodos={this.loadTodos}
            />
        );
    }
}
    const mapStateToProps = (state) => {
        return {
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


