import React, { Component } from 'react';

class FormInput extends Component {
    render() {
        return (
            <div>
                <input
                    className='inpt'
                    type={this.props.type}
                    id={this.props.idN}
                    placeholder={this.props.placeholder}
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: '#FFE9C9',
                        borderWidth: '0px 0px 4px 0px',
                        borderRadius: '2px',
                        outline: 'none',
                        fontSize: '25px',
                        color: '#FFE4BA',
                        margin: '0 0 20px 0'
                    }}
                />
            </div>
        );
    }
}

export default FormInput;