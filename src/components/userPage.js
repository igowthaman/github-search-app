import React from 'react';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import connect from './connector';
import UserProfile from './userPageComponents/userProfile';
import UserDetails from './userPageComponents/userDetails';
import SearchIcon from '@mui/icons-material/Search';


class UserPage extends React.Component {
    state={
        loading : true
    }
    async componentDidMount(){

        const userid = window.location.toString().split("/")[3];

        const userDetails = await connect("GET",`https://api.github.com/users/${userid}`);
        if(userDetails.status !== 200){
            this.setState({
                loading : false,
                userDetails : null
            })
            return;
        }

        let userRepos = await connect("GET", userDetails.data.repos_url);
        if(userRepos.status !== 200){
            userRepos = {data:[]}
        }

        let userFollowers = await connect("GET", userDetails.data.followers_url);
        if(userFollowers.status !== 200){
            userRepos = {data:[]}
        }

        let userFollowing = await connect("GET", userDetails.data.following_url.split("{")[0]);
        if(userFollowing.status !== 200){
            userRepos = {data:[]}
        }

        this.setState({
            loading : false,
            userDetails : userDetails.data,
            userRepos : userRepos.data,
            userFollowers : userFollowers.data,
            userFollowing : userFollowing.data
        })
    }

    render() { 

        return (
            <div className='App d-block'>
                 <Link className='text-light d-flex align-items-center p-3 text-decoration-none border-light border-bottom justify-content-between bg-dark' to='/'>
                    <div className='d-flex align-items-center px-4'>
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" className="App-logo">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                        </svg>
                        <span className='App-title'>GitHub Search</span>
                    </div>
                    <div className='px-5'>
                        <SearchIcon fontSize='large' />
                    </div>
                </Link>
                <div className='text-center text-light'>
                    {
                        this.state.loading
                        ?<CircularProgress size={35} className='my-5'/>
                        :(
                            this.state.userDetails
                            ?<div className='row m-0 pt-4'>
                                <UserProfile user={this.state.userDetails}/>
                                <UserDetails repos={this.state.userRepos} followers={this.state.userFollowers} following={this.state.userFollowing}/>
                            </div>
                            :<div className='fw-bold fs-3 opacity-50'>
                                404 <br></br> User not found !!!
                            </div>
                        )
                    }
                </div>
            </div> 
        );
    }
}


export default UserPage;