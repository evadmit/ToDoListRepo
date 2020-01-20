import React, { Component } from 'react';
import RegisterComponent from '../../components/RegisterComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from '../../actions/registerActions';
import { validate } from '../../utils/validation';
import { saveToken } from '../../utils/storage';
import { NavigationActions, StackActions } from 'react-navigation';


class RegisterContainer extends Component {

    state = { isLoading: false }
    onSuccess = (data) => {
        this.setState({ isLoading: false })
        if (data.token && data.token.length > 0) {
            saveToken(data.token).then((isSuccess) => {
                if (isSuccess) {
                    const { navigation } = this.props;
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'ToDoList' }),
                        ],
                    });
                    navigation.dispatch(resetAction);
                }
            });
        }
    }
    onError = (error) => {
        this.setState({ isLoading: false })
        console.log(error)

    }
    register = (params) => {
        this.setState({ isLoading: true })
        const emailValidation = validate('email', params.email.trim())
        const passwordValidation = validate('password', params.password.trim())
        if (params.password != params.confirmPassword) {
            alert("passwords doesn't match!")
        }
        this.props.actions.register.register({ 
            name: params.name, 
            email: params.email, 
            password: params.password 
        }, this.onSuccess, this.onError)
    }
    render() {
        return (
            <RegisterComponent
                register={this.register}
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