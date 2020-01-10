import React, { Component } from 'react';
import {Switch, Text, StyleSheet, View, FlatList, ScrollView, Button, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { withNavigation } from 'react-navigation';
import flatListData from '../data'


class ToDoListComponent extends Component {

    onAddPress = () => {
        this.props.navigation.navigation('NewToDo')
    };
    

    constructor(props) {
        super(props);
  try {
       var todos = props.loadTodos();
       console.log("todos: ", todos);
  } catch (error) {
    console.log("loadTodos error : ", error);
  }
      
        this.state = ({
            deletedRowKey: null,
        });
    }

    refreshFlatList = (deletedKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: deletedKey
            };
        });
    }
    render() {


        return (
            <View style={{flex:1}} navigation={this.props.navigation}>

                <ScrollView>
                <Button title="load"   onPress={() => {console.log("pressed"); this.props.loadTodos();}}></Button>
      
                <FlatList
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem  navigation={this.props.navigation} item={item} index={index} parentFlatList={this}>

                            </FlatListItem>
                        );
                    }
                    }>


                </FlatList>
                </ScrollView>
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
            activeRowKey: null
        };
    } 


    showDetails(_id){
        this.props.navigation.navigate('EditToDo');
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

            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        flatListData.splice(this.props.index, 1);
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
                    <TouchableHighlight  onPress={() => this.props.navigation.navigate('EditToDo')}>  
                       
  
                    <View style={{ 
                        flex: 1, 
                        flexDirection: 'row', 
                        backgroundColor: 'white',
                        justifyContent:'space-between' }} >
                        <Text style={styles.item}>{this.props.item.foodDescription}</Text>
                        <Switch ></Switch>
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

