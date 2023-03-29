import React from 'react';
import { Card , Button, Chip} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Link } from 'react-router-dom';

class RepoProfile extends React.Component {
    
    
    
    render() { 

        const repoProfileCard = {
            "padding" : "20px",
            "border" : "solid 0px black",
            "borderRadius" : "1.5rem",
            "color" : "white"
        };

        return (
            <Card variant="outlined" style={repoProfileCard} className='col-10 col-lg-5 mx-auto bg-dark my-3'>
                <div className='d-flex align-items-center border-bottom border-secondary pb-2'>
                    <div className='ps-3 text-start d-flex'>
                        <Link to={"/"+this.props.repoDetails.owner.login} className='text-decoration-none h5 text-primary'>{this.props.repoDetails.owner.login}/</Link>
                        <h3 className='p-0 m-0 fs-5 text-primary'>{this.props.repoDetails.name}</h3>
                        <Chip label={this.props.repoDetails.visibility} variant='outlined' className='mx-2 fw-bold text-light text-capitalize'/>
                    </div>
                </div>
                <div className='ps-2 pt-2 text-start mb-5'>
                    <div className='d-flex py-1'><PersonIcon /> <Link to={"/"+this.props.repoDetails.owner.login} className='text-decoration-none text-light'><p className='m-0 ps-2'>{this.props.repoDetails.owner.login}</p></Link></div>
                    {
                        this.props.repoDetails.description 
                        ?<div className='d-flex py-1'><DescriptionIcon /> <p className='m-0 ps-2'>{this.props.repoDetails.description}</p></div>
                        : "" 
                    }
                    <div className='d-flex py-1 mb-2'>
                        <CalendarTodayIcon /> 
                        <p className='m-0 ps-2'>{this.props.repoDetails.created_at.split("T")[0]}</p>
                    </div> 
                    {
                        Object.keys(this.props.repoLanguage).length
                        ?<div className='d-flex py-1 mb-2'>
                            <TerminalIcon /> 
                            <div className='m-0 ps-2'>
                                {Object.keys(this.props.repoLanguage).map((item, ind)=>{return <Chip label={item} key={ind} variant="outlined" className='text-light fw-bold mx-1 py-1'/>})}
                            </div>
                        </div>
                        :""
                    }   
                </div>
                <Button variant="outlined" endIcon={<GitHubIcon />} href={this.props.repoDetails.html_url} target='_blank' style={{"fontWeight":"bold"}}>
                    View on
                </Button>
            </Card>
        );
    }
}
 
export default RepoProfile;