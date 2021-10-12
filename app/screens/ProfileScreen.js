import React from 'react'
import { StyleSheet, Text, View, Button, Alert  } from 'react-native'
import { AuthContext } from './../context/context';

export default function ProfileScreen(props) {

    const { authContext } = React.useContext(AuthContext);
    const { loginState } = React.useContext(AuthContext);

    debugger;
    return (
        <View>
           <Button title="Cerrar Sesión"  onPress={() => authContext.signOut() }></Button>
        </View>
    )
}

const styles = StyleSheet.create({})
