import React, { Component } from 'react';
import { RefreshControl,Switch, Text, StyleSheet, View, FlatList, ScrollView, Button, TextInput, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';
import flatListData from '../data'



class FlatListItem extends Component {



    
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        };
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
            <Swipeout {...swipeoutSettings}>
                <View style={{
                        flex: 1,
                        flexDirection: 'column'
                    }}>
                    <View style={{ 
                        flex: 1, 
                        flexDirection: 'row', 
                        backgroundColor: 'white',
                        justifyContent:'space-between' }}>
                        <Text style={styles.item}>{this.props.item.foodDescription}</Text>
                        <Switch ></Switch>
                    </View>
{/* 
                    <View style={{ height: 1, backgroundColor: 'white' }}></View> */}
                </View>
            </Swipeout>
        )
    }
}

class ToDoListComponent extends Component {
    onAddPress = () => {
        this.props.navigation.navigation('NewToDo')
    };


    constructor(props) {
        super(props);
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
            <View style={{flex:1}}>
                <ScrollView>
                <FlatList
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem item={item} index={index} parentFlatList={this}>

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

