import React from 'react';
import SingIn from '../../components/sign-in/sign-in.component';
import './sign-in-and-sign-up.styles.scss';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SingIn></SingIn>
        <SignUp></SignUp>
    </div>
)

export default SignInAndSignUpPage;