import React from 'react';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import connect from './connector';
import SearchIcon from '@mui/icons-material/Search';
import RepoProfile from './repoPageComponents/repoProfile';
import RepoContent from './repoPageComponents/repoContent';

class repoPage extends React.Component {

    constructor(){
        super();
        this.state = {
            loading : true,
            status : false
        }
    }
    
    async componentDidMount(){
        const userid = window.location.toString().split("/")[3];
        const repoid = window.location.toString().split("/")[4];
        
        const repoDetails = await connect("GET",`https://api.github.com/repos/${userid}/${repoid}`);

        if(repoDetails.status !== 200){
            this.setState({
                loading : false
            })
            return;
        }

        let repoLanguage = await connect("GET",repoDetails.data.languages_url);
        if(repoLanguage.status !== 200){
            repoLanguage = {data:{}}
        }

        this.setState({
            loading : false,
            repoDetails : repoDetails.data,
            repoLanguage : repoLanguage.data
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
                            this.state.repoDetails
                            ?<div className='row m-0 pt-4'>
                                <RepoProfile repoDetails={this.state.repoDetails} repoLanguage={this.state.repoLanguage}/>
                                <RepoContent repoDetails={this.state.repoDetails} />
                            </div>
                            :<div className='fw-bold fs-3 opacity-50'>
                                404 <br></br> Repo not found !!!
                            </div>
                        )
                    }
                </div>
            </div> 
        );
    }
}


export default repoPage;