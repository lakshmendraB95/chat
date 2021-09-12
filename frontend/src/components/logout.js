import { Component } from "react";

export default class logout extends Component{

    componentDidMount()
    {
        window.localStorage.removeItem('x-auth-token')
        window.location = '/login'
    }
}