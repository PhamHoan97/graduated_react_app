import React,{ Component } from "react";
class Comments extends Component{

    render(){
        return (
            <div>
                <textarea id="description" rows={4} cols={50} />
            </div>
        );
    }
}

export default Comments;