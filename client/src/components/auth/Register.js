import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import classnames from 'classnames'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        axios.post('/api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }))
    }

    render() {
        const { errors } = this.state
        return (
            <section class="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" action="create-profile.html" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        {errors.name && (<div className="Invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        {errors.email && (<div className="Invalid-feedback">{errors.email}</div>)}
                        <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        {errors.password && (<div className="Invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password2
                            })}
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            value={this.state.password2}
                            onChange={this.onChange}
                        />
                        {errors.password2 && (<div className="Invalid-feedback">{errors.password2}</div>)}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        )
    }
}

export default Register