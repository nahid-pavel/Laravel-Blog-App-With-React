import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import moment from "moment";

import Axios from "axios";

const EditPost = ({ post, toggleEdit }) => {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);

    const onEditHandler = e => {
        e.preventDefault();
        Axios.put(`http://127.0.0.1:8000/api/posts/${post.id}`, {
            title,
            description,
            user_id: 1
        }).then(res => {
            toggleEdit();
            setTitle("");
            setDescription("");
        });
    };

    return (
        <Form>
            <div className="row">
                <div className="col-md-9">
                    <input
                        style={{
                            width: "100%",
                            height: "30px",
                            fontSize: "30px",
                            padding: "15px"
                        }}
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-3 ">
                    <Button className="btn btn-info mr-2" onClick={toggleEdit}>
                        {" "}
                        Cancel Edit
                    </Button>
                    <Button className="btn btn-info " onClick={onEditHandler}>
                        {" "}
                        Save
                    </Button>
                </div>
            </div>

            <textarea
                rows="15"
                cols="15"
                style={{ width: "100%", padding: "10px" }}
                className="mt-4"
                onChange={e => setDescription(e.target.value)}
            >
                {description}
            </textarea>
        </Form>
    );
};

export default EditPost;
