import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CircularProgress, Breadcrumbs } from '@mui/material';
import AceEditor from 'react-ace'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import connect from '../connector';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-text';

class RepoContent extends React.Component {

    state = {
        status : false,
        repoContent :[],
        path :"",
        file : ""
    }

    componentDidMount(){
        this.getRepoContents();     
    }

    componentDidUpdate(){
        if(!this.state.status){
            this.getRepoContents()
        }
    }

    getRepoContents = async ()=>{
        let repoContent = await connect("GET",this.props.repoDetails.contents_url.split("{")[0]+this.state.path);
        if(repoContent.status !== 200){
            repoContent = {data:[]}
        }
        this.setState({
            ...this.state,
            status: true,
            repoContent : repoContent.data
        })
    }

    updatePath(newValue){
        if(this.state.path === newValue) return;

        this.setState({
            status : false,
            repoContent :[],
            path : newValue,
            file : false
        })
    }

    addPath(newValue, file=false){
        if(this.state.path !== ""){
            newValue = this.state.path + "/" + newValue;
        }
        this.setState({
            status : false,
            repoContent :[],
            path : newValue,
            file : file
        })
    }


    b64_to_utf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

    getLanguageMode(fileName) {
        const extension = fileName.split(".")[1];
        switch (extension) {
          case "py":
            return "python";
          case "java":
            return "java";
          default:
            return "text";
        }
    }


    render() { 
        const repoContentCard = {
            "border" : "solid 0px black",
            "borderRadius" : "1.5rem",
            "color" : "white",
        };

        const repoContentBody = {
            "overflowY" : "auto",
            "height" : "70vh",
            "padding" : "0px 0px 20px 0px",
            "overflowX" : "hidden"
        };

        let temp_path = null;

        return (
        <Card variant="outlined" className='col-10 col-lg-6 bg-dark text-center mx-auto my-3 p-2' style={repoContentCard}>
            <div className='px-3 py-2 text-start' >
                <Breadcrumbs aria-label="breadcrumb" className=' fs-5 text-light'>
                    {
                        [this.props.repoDetails.name,...this.state.path.split("/") ].map((item, ind)=>{
                            if(temp_path !== null && temp_path !== ""){
                                temp_path += "/"+item;
                            }
                            else if(temp_path !== null){
                                temp_path = item;
                            }
                            else{
                                temp_path = ""
                            }
                            let local_path = temp_path;
                            return <Link underline="hover" key={ind} className='text-decoration-none text-light' onClick={()=>{this.updatePath(local_path)}}>
                                {item}
                            </Link>
                        })
                    }
                    
                </Breadcrumbs>
            </div> 
            <hr className='m-0 mt-2'/>
            <div style={repoContentBody}>
                { 
                    this.state.status 
                    ?(
                        this.state.file
                        ?<div className='text-start p-3 bg-dark'>
                            {
                                <AceEditor
                                    style={{width:"100%"}}  
                                    theme='twilight' 
                                    readOnly={true}
                                    value={this.b64_to_utf8(this.state.repoContent.content)}
                                    fontSize={16}
                                    mode={this.getLanguageMode(this.state.repoContent.name)}
                                />
                            }
                        </div>  
                        :this.state.repoContent.map((item, ind)=>{
                            if(item.type === "file" ){
                                return <div className='d-flex p-2 border-bottom border-secondary repo-content' key={ind}>
                                    <InsertDriveFileIcon className='mx-2'/>
                                    <div onClick={()=>{this.addPath(item.name, true)}} role='button' className='text-decoration-none text-primary'>
                                        {item.name}     
                                    </div>
                                </div>
                                
                            }
                            else{
                                return <div className='d-flex p-2 border-bottom border-secondary repo-content' key={ind}>
                                    <FolderIcon className='mx-2'/>
                                    <div onClick={()=>{this.addPath(item.name)}} role='button' className='text-decoration-none text-primary'>
                                        {item.name}     
                                    </div>
                                </div>
                            }
                        }) 
                    )
                    :<CircularProgress size={35} className='my-5'/>
                } 
            </div> 
        </Card>
        );
    }
}
 
export default RepoContent;