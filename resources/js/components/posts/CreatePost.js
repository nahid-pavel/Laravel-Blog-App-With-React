import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const CreatePost = ({ history }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = e => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("http://127.0.0.1:8000/api/posts", {
                title,
                description,
                user_id: 1
            })
            .then(res => {
                if (res.data.success) {
                    setLoading(false);
                    history.push("/");
                }
            });
    };

    return (
        <Card className="mt-5">
            <Form className="m-4" onSubmit={onSubmitHandler}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows="5"
                        placeholder="Enter description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>
                {loading && (
                    <Button variant="primary" type="submit" disabled>
                        Saving
                    </Button>
                )}
                {!loading && (
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                )}
            </Form>
        </Card>
    );
};

export default withRouter(CreatePost);
