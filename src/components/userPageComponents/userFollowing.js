import React from 'react';

class UserFollowing extends React.Component {
    
    render() { 
        return (
            <div className='row pt-5'>
                {
                    this.props.following.length === 0 ?
                    <div style={{"textAlign":"center",padding:20}}> No Following !!!</div>
                    :this.props.following.map((item, index)=>{
                        return <a className="d-flex text-decoration-none text-light pb-2 px-3 pt-3 align-items-center border border-1 border-secondary" href={item.login} key={index}>
                            <img className="search-result-img" src={item.avatar_url} alt={item.login}></img>
                            <div className="search-result-name">{item.login}</div>
                        </a>;
                    })
                }
            </div>        
        );
    }
}
 
export default UserFollowing;