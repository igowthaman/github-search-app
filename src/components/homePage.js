import React, {createRef} from 'react';
import {  TextField, CircularProgress} from '@mui/material';
import connect from './connector';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';



class HomePage extends React.Component {

    constructor(props){
        super();
        this.state = {
            users : null,
            loader : true
        }

        this.searchResultRef = createRef();
    }

    debounceSearchFunc = debounce(
        (event)=>{
            connect("GET",`https://api.github.com/search/users?q=${event.target.value}`)
            .then(
                (response)=>{
                    this.setState({
                        loader : false,
                        users: response.data.items
                    })
                }
            );
        },
        1500
    )

    searchGithub(event){
        this.setState({
            users :null,
            loader : true
        })
        if(event.target.value.length === 0){
            this.searchResultRef.current.classList.remove("active");
            return;
        }
        this.searchResultRef.current.classList.add("active"); 
        this.debounceSearchFunc(event);
    }

    render() { 

        return ( 
        <div className="App">
            <header className="App-header">
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" className="App-logo">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
                <span className='App-title'>GitHub Search</span>
            </header>
            <div className='App-body'>
                <TextField
                    id="Search-input"
                    type="search"
                    variant="filled"
                    className="Search-input"
                    onChange={(event)=>{this.searchGithub(event)}}
                    autoComplete="off"
                    placeholder="Search Github Username"
                />
                <div  id="Search-result" className="Search-result" ref={this.searchResultRef}>
                    {
                        this.state.loader
                        ?<CircularProgress size={25}/>
                        :(
                            this.state.users
                            ?this.state.users.map((item, index)=>{
                                return <Link className="search-result-card" to={item.login} key={index}>
                                    <img className="search-result-img" src={item.avatar_url} alt={item.login}></img>
                                    <div className="search-result-name">{item.login}</div>
                                </Link>;
                            })
                            :<div>No Users Found !!!</div>
                        )
                    }
                </div>
            </div>
        </div>
        );
    }
}
 
export default HomePage;