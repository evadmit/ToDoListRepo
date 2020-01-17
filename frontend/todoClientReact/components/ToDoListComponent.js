import React, { Component } from 'react';
import {Switch, Text, StyleSheet, View, FlatList, ScrollView, Button, TouchableHighlight, SafeAreaView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';

import flatListData from '../data'


class ToDoListComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = ({
            deletedRowKey: null,
        });
        
       this.onSuccess = this.onSuccess.bind(this);
       this.onError = this.onError.bind(this);
    }
    componentWillMount(){
        
    }
    onSuccess = (data) => {
      
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

                   <SafeAreaView>
                <Button title="load"   onPress={() => {try {
                      this.props.loadTodos(this.onSuccess, this.onError)
                } catch (error) {
                    console.log(error)
                }
                  
                    }}></Button>
    
                <FlatList
                    extraData={this.state.isLoading}
                    keyExtractor={item => item._id}
                    data={this.state.todos}                   
                    renderItem={({ item, index }) => {
                        if(typeof item !== 'undefined'){
                        return (
                            <FlatListItem item={item} navigation={this.props.navigation}  index={index} parentFlatList={this}>

                            </FlatListItem>
                        );}
                    }
                    }
                    >
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
        console.log("FlatListItem item ", props.item.title)
        this.showDetails = this.showDetails.bind(this);
        this.state = {
            activeRowKey: null,
            item: props.item
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
                        <Text style={styles.item}>{this.state.item.title}</Text>
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

