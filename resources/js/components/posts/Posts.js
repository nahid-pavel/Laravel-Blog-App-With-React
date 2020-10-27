import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Button } from "react-bootstrap";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = () => {
        axios
            .get("http://127.0.0.1:8000/api/posts")
            .then(res => {
                setPosts(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(true);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <div className="p-4 ">
            <h2 className="text-center"> All Posts</h2>
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}
            {posts.map(item => (
                <Card className="mt-2">
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>{item.description}</Card.Text>
                        <Button variant="primary" className="mr-2">
                            View
                        </Button>
                        <Button variant="success" className="mr-2">
                            Edit
                        </Button>
                        <Button variant="danger" className="mr-2">
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Posts;
