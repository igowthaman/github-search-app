import React from 'react';
import { Card } from '@mui/material';
import UserRepos from './userRepos';
import UserFollowers from './userFollower';
import UserFollowing from './userFollowing';

class UserDetails extends React.Component {
    state = {
        tab : 0
    }

    changeTab(newValue){
        this.setState({
            tab : newValue
        })
    }

    render() {
        const userDetailsCard = {
            "border" : "solid 0px black",
            "borderRadius" : "1.5rem",
            "color" : "white"
        };

        const userDetailsBody = {
            "overflowY" : "auto",
            "height" : "77vh",
            "padding" : "0px 0px 20px 0px",
            "overflowX" : "hidden"
        };


        return (
        <>
            <Card variant="outlined" className='col-10 col-lg-6 bg-dark text-start mx-auto my-3 p-0' style={userDetailsCard}>
                <div className='position-relative'>
                    <div className='position-absolute pb-1 p-3 w-100 bg-dark border-bottom border-secondary d-flex align-items-center rounded-top-4'>
                        <h5 className={ this.state.tab === 0? "mx-2 fw-bold fs-5" : " mx-2 fw-normal fs-6" } role="button" onClick={()=>{this.changeTab(0)}}>Repositories <span className='opacity-50'>({this.props.repos.length})</span></h5>
                        <h5 className={ this.state.tab === 1? "mx-2 fw-bold fs-5" : " mx-2 fw-normal fs-6" } role="button" onClick={()=>{this.changeTab(1)}}>Followers <span className='opacity-50'>({this.props.followers.length})</span></h5>
                        <h5 className={ this.state.tab === 2? "mx-2 fw-bold fs-5" : " mx-2 fw-normal fs-6" } role="button" onClick={()=>{this.changeTab(2)}}>Following <span className='opacity-50'>({this.props.following.length})</span></h5>
                    </div>
                    <div style={userDetailsBody}>
                        {this.state.tab === 0 && <UserRepos repos={this.props.repos}/>}
                        {this.state.tab === 1 && <UserFollowers followers={this.props.followers} />}
                        {this.state.tab === 2 && <UserFollowing following={this.props.following} />}
                    </div>
                    
                </div>
            </Card>
        </>);
    }
}
 
export default UserDetails;