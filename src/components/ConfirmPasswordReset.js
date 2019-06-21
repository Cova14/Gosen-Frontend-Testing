import React from 'react';

class ConfirmPasswordReset extends React.Component {
    state = {
      password: '',
      confirmPassword: '',
      done: false,
      token: this.props.match.params.token
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

    handleSubmit = (e, token) => {
        if (this.state.password === this.state.confirmPassword) {
            console.log(this.state.token)
            let data = {
                password:this.state.password,
                token:token
            }
            console.log(JSON.stringify(data))
            console.log(data)
            e.preventDefault();
            fetch('http://localhost:8000/accounts/password_reset/confirm/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({
                done: true
                });
            });
        } else {
            alert('Las contraseñas no coinciden')
        }
      }

    render() {
        return (
          <div>
            {!this.state.done?
              <form onSubmit={e => this.handleSubmit(e, (this.state.password, this.state.token))}>
                <h4>Sign Up</h4>
                <label htmlFor="Contraseña">Nueva Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handle_change}
                />
                <label htmlFor="Repetir Contraseña">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handle_change}
                />
                <input type="submit" />
              </form>
          :
              <h3>Tu contraseña ha sido restablecita correctamente</h3>
          }
          </div>
        );
      }
    }

export default ConfirmPasswordReset;