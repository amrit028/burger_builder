import React , { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../auxiliary/auxiliary';

const withErrorHadler = ( WrappedComponent ,axios ) => {
    return class extends Component {

        state = {
            error:null
        }

        componentWillMount(){
            this.reqInterceptor=axios.interceptors.request.use( req => {
                this.setState({error:null});
                return req;
            });

            this.resInterceptor=axios.interceptors.response.use( null,err => {
                this.setState({error:err});
            });
        }

        errorConfirmedHandler(){
            this.setState({error:null});
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error!==null}
                        modalClosed={()=>this.errorConfirmedHandler()}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>

                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        };
    }
}

export default withErrorHadler;