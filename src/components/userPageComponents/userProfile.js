import React from 'react';
import { Card , Button} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

class UserProfile extends React.Component {
    
    render() { 
        const userProfileBody = {
            "padding" : "20px",
            "border" : "solid 0px black",
            "borderRadius" : "1.5rem",
            "color" : "white"
        };
        const userProfileImg = {
            "border": "0px solid black",
            "borderRadius": "50%",
            "width" : "150px",
            "height" : "150px"
        }
        return (
            <Card variant="outlined" style={userProfileBody} className='col-10 col-lg-5 mx-auto bg-dark my-3'>
                <div className='d-flex align-items-center border-bottom border-secondary pb-2'>
                    <img src={this.props.user.avatar_url} alt="Profile" style={userProfileImg}></img>
                    <div className='ps-3 text-start'>
                        <h3 className='p-0 m-0'>{this.props.user.name}</h3>
                        <p className='ps-1 p-0 opacity-50 m-0'>{this.props.user.login}</p>
                    </div>
                </div>
                <div className='ps-2 pt-2 text-start'>
                    {this.props.user.bio ?<div className='d-flex py-1'><PersonIcon /> <p className='m-0 ps-2'>{this.props.user.bio}</p></div>: "" }
                    {this.props.user.company ?<div className='d-flex py-1'><BusinessIcon /> <p className='m-0 ps-2'>{this.props.user.company}</p></div>: "" }
                    {this.props.user.location ?<div className='d-flex py-1'><LocationOnIcon /> <p className='m-0 ps-2'>{this.props.user.location}</p></div>: "" }
                    {this.props.user.blog ?<a href={this.props.user.blog} className="text-decoration-none text-light"><div className='d-flex py-1'><InsertLinkIcon /> <p className='m-0 ps-2'>{this.props.user.blog}</p></div></a>: "" }
                    <div className='d-flex py-1 mb-2'><CalendarTodayIcon /> <p className='m-0 ps-2'>{this.props.user.created_at.split("T")[0]}</p></div> 
                </div>
                <Button variant="outlined" endIcon={<GitHubIcon />} href={this.props.user.html_url} target='_blank' style={{"fontWeight":"bold"}}>
                    View on
                </Button>
            </Card>
        );
    }
}
 
export default UserProfile;