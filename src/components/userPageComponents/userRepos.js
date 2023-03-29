import React from 'react';
import { Card} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Link } from 'react-router-dom';

class UserRepos extends React.Component {
    
    render() { 
        const repoStyle = {
            "height" : "120px"
        }

        return (
            <div className='positin-relative'>
                <div className='row pt-5'>
                    {
                        this.props.repos.length === 0?
                        <div style={{"textAlign":"center",padding:20}}> No Repositories Found !!!</div>
                        :this.props.repos.map((repo, index)=>{
                            return <Card variant="outlined" className='col-11 col-md-5 m-auto mt-4 border-light bg-dark text-light px-3 py-2 rounded-4' key={index} style={repoStyle}>
                                <Link to={repo.name} className='text-decoration-none'><h5 className='border-bottom border-secondary pb-2'>{repo.name}</h5></Link>
                                <p className='mb-0'>{repo.description}</p>
                                <small className='mb-1'><CalendarTodayIcon fontSize={"10"}/> {repo.created_at.split("T")[0]}</small>
                            </Card>
                        })
                    }
                </div>
            </div>
        );
    }
}
 
export default UserRepos;