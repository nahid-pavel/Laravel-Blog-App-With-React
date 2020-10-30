import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    Spinner,
    Button,
    InputGroup,
    FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [searchText, setSearchText] = useState("");

    const getPosts = () => {
        axios
            .get("http://127.0.0.1:8000/api/posts")
            .then(res => {
                setPosts(res.data.data);
                setLoading(false);
                setSearchedPosts(res.data.data);
            })
            .catch(err => {
                setLoading(true);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

    const searchHandler = text => {
        const searchText = text.trim().toLowerCase();
        if (searchText.length > 1) {
            const searchData = searchedPosts.filter(item => {
                const itemData = item.title + " " + item.description;
                return (
                    itemData
                        .trim()
                        .toLowerCase()
                        .indexOf(searchText) !== -1
                );
            });

            setSearchedPosts(searchData);
            setSearchText(searchText);
        } else {
            getPosts();
            setSearchText(searchText);
        }
    };

    const onDeleteHandler = postId => {
        axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`).then(res => {
            console.log(res);
            if (res.data.success) {
                getPosts();
            } else {
                alert("Something went wrong");
            }
        });
    };

    return (
        <div className="p-4 ">
            <div className="float-left">
                <h2 className="text-center"> All Posts</h2>
            </div>
            <div className="float-left">
                <InputGroup className="mb-3 ml-3">
                    <FormControl
                        style={{ width: "400px" }}
                        placeholder="Please Enter Search Keywords"
                        aria-label="Please Enter Search Keywords"
                        aria-describedby="basic-addon2"
                        onChange={e => searchHandler(e.target.value)}
                    />
                </InputGroup>
            </div>
            <div className="float-right">
                <Link to="/create" className="btn btn-info">
                    {" "}
                    + Create New Post
                </Link>
            </div>
            <div className="clearfix"></div>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}
            {searchedPosts.map(item => (
                <Card className="mt-2">
                    <Card.Header>
                        <h2>{item.title}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {item.description.length > 100
                                ? `${item.description.substr(0, 100)}....`
                                : item.description}
                        </Card.Text>
                        <Button
                            as={Link}
                            to={`/edit/${item.id}`}
                            variant="primary"
                            className="mr-2"
                        >
                            View
                        </Button>

                        <Button
                            variant="danger"
                            className="mr-2"
                            onClick={() => onDeleteHandler(item.id)}
                        >
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Posts;
