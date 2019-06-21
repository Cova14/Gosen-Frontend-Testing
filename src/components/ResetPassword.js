import React from 'react';

class ResetPassword extends React.Component {
    state = {
      email: ''
    };

    handle_change = e => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
      });
    };

    handleSubmit = (e, data) => {
        console.log("working")
        e.preventDefault();
        fetch('http://localhost:8000/accounts/password_reset/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(json => {
            console.log("done")
            this.setState({
              requested: true
            });
          });
      }

    render() {
        return (
          <div>
            {!this.state.requested?
              <form onSubmit={e => this.handleSubmit(e, this.state)}>
                <h4>Sign Up</h4>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handle_change}
                />
                <input type="submit" />
              </form>
          :
              <h3>Se ha enviado un correo con instrucciones a tu email</h3>
          }
          </div>
        );
      }
    }

export default ResetPassword;