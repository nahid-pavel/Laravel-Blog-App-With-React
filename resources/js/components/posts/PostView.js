import Axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import EditPost from "./EditPost";

const PostView = props => {
    const [post, setPost] = useState({});
    const [toggleEditPost, setToggleEditPost] = useState(false);

    const getPost = () => {
        Axios.get(`http://127.0.0.1:8000/api/posts/${props.match.params.id}`)
            .then(res => {
                console.log(res.data.data);
                setPost(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const toggleEdit = () => {
        setToggleEditPost(!toggleEditPost);
    };
    useEffect(() => {
        getPost();
    }, [toggleEditPost]);

    return (
        <div className="p-4">
            {!toggleEditPost && post && (
                <div>
                    <div className="float-left">
                        <h2>{post.title}</h2>
                    </div>
                    <div className="float-right">
                        <Button className="btn btn-info" onClick={toggleEdit}>
                            {" "}
                            Edit Post
                        </Button>
                    </div>
                    <div className="clearfix"></div>

                    <p class="lead text-muted">
                        {moment(post.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                    </p>
                    <div>
                        <p class="lead">{post.description}</p>
                    </div>
                </div>
            )}
            {toggleEditPost && <EditPost post={post} toggleEdit={toggleEdit} />}
        </div>
    );
};

export default PostView;
