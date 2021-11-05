import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(user)
    }

    render() {
        return (
            <div className="login">
                <section className="container">
                    <h1 className="large text-primary">Sign In</h1>
                    <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                    <form className="form" action="dashboard.html" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                    <p className="my-1">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </section>
            </div>
        )
    }
}

export default Login