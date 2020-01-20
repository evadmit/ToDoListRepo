import React, { Component } from 'react';
import { Switch, Text, StyleSheet, View, FlatList, TouchableHighlight, SafeAreaView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { withNavigation } from 'react-navigation';


class ToDoListComponent extends Component {

    state = {
        isLoading: true, todos: {}, isDataReady: false
    }

    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }
    componentWillMount() {
        this.loadTodos();
    }

    onSuccess = (data) => {
        this.setState((prevState) => ({

            isLoading: !prevState.isLoading, todos: data, isDataReady: !prevState.isDataReady
        }));
        return data;
    }

    onError = (error) => {
        console.log("onError: ", error)
        this.setState({
            isLoading: false, isDataReady: false
        });


    }

    loadTodos = () => {
        try {
            this.props.loadTodos(this.onSuccess, this.onError)
        } catch (err) {
            console.log(err)
            alert('Application Error. Cannot load data.', err)
        }
    }

    saveTodos = newToDos => {
        const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos))
    }

    refreshFlatList = (deletedKey) => {
        this.loadTodos();
        this.setState({
            deletedRowKey: deletedKey
        });
    }


    render() {

        return (
            <View style={{ flex: 1 }} navigation={this.props.navigation}>
                <SafeAreaView>

                    <FlatList
                        extraData={this.state.isLoading}
                        keyExtractor={item => item._id}
                        data={this.state.todos}
                        renderItem={({ item, index }) => {
                            return (
                                <FlatListItem item={item} navigation={this.props.navigation} index={index} parentFlatList={this}>

                                </FlatListItem>
                            );
                        }}>
                    </FlatList>
                </SafeAreaView>
                <TouchableHighlight style={styles.fab} onPress={() => this.props.navigation.navigate('NewToDo')}>
                    <Text style={styles.text}>+</Text>
                </TouchableHighlight >
            </View>
        )
    }

}

class FlatListItem extends Component {

    constructor(props) {
        super(props);
        this.showDetails = this.showDetails.bind(this);
        this.state = {
            activeRowKey: null,
            activeRow: null,
            item: props.item
        };
    }

    onSuccess = (data) => {
    }

    onError = (error) => {
        console.log("delete onError: ", error)
    }

    showDetails(_id) {
        this.props.navigation.navigate('EditToDo');
    }

    changeStatus = (value) =>{
        
        const changeStatusRow = this.props.item;
        this.props.parentFlatList.props.changeTodoStatus(changeStatusRow._id, this.onSuccess, this.OnError)
        this.props.parentFlatList.refreshFlatList(changeStatusRow);             
    }

    render() {
        const swipeoutSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {

                if (this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({
                    activeRowKey: this.props.item._id,
                    activeRow: this.props.item
                })
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRow;
                        this.props.parentFlatList.props.deleteTodo(deletingRow._id, this.onSuccess, this.OnError)
                        //refresh
                        this.props.parentFlatList.refreshFlatList(deletingRow);
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };

        return (
            <Swipeout {...swipeoutSettings} >
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('EditToDo')}>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between'
                        }} >
                            <Text style={styles.item}>{this.props.item.title}</Text>
                            <Switch value={this.props.item.isCompleted} onValueChange = {this.changeStatus}></Switch>
                        </View>
                    </TouchableHighlight>

                </View>
            </Swipeout>
        )
    }
}


export default withNavigation(ToDoListComponent);
const styles = StyleSheet.create({

    fab: {
        height: 65,
        width: 65,
        borderRadius: 200,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#60b1fc',
    },

    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    },

    text: {
        fontSize: 35,
        color: 'white'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

