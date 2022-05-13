import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import UserCard from "./UserCard";
import { API } from "../backend";

export default function Users() {
  const [filterText, setFilterText] = useState("");
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    return await fetch(`${API}/user/all`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        setUsers(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="Home">
        <Row className="Home_Sidebar">
          <Col className="Home_Sidebar_Col" md={2}>
            <Sidebar></Sidebar>
          </Col>
          <Col md={10}>
            <Row className="tags_header">
              <Col md={12}>
                <Row>
                  <div className="Home_Questions_Col_Tabs_Text">Users</div>
                </Row>
                <Row>
                  <div className="tags_info">
                    A tag is a keyword or label that categorizes your question
                    with other, similar questions. Using the right tags makes it
                    easier for others to find and answer your question.
                  </div>
                </Row>
                <Row className="tags_search_btn_group">
                  <Col md={4}>
                    <div className="tags_search-middle">
                      <div className="tags_search_container">
                        <SearchIcon />
                        <input
                          onChange={(e) =>
                            (e.target.value.length >= 3 ||
                              e.target.value.length === 0) &&
                            setFilterText(e.target.value)
                          }
                          type="text"
                          placeholder="Filter by tag name..."
                        />
                      </div>
                    </div>
                  </Col>
                  <Col ms={2}></Col>
                  <Col md={6}>
                    <div className="tags_button_group">
                      <Button
                        className="Home_Questions_Col_Tabs_Filter_Button"
                        variant="light"
                      >
                        Reputation
                      </Button>
                      <Button
                        className="Home_Questions_Col_Tabs_Filter_Button"
                        variant="light"
                      >
                        New Users
                      </Button>
                      <Button
                        className="Home_Questions_Col_Tabs_Filter_Button"
                        variant="light"
                      >
                        Voters
                      </Button>
                      <Button
                        className="Home_Questions_Col_Tabs_Filter_Button"
                        variant="light"
                      >
                        Editors
                      </Button>
                      <Button
                        className="Home_Questions_Col_Tabs_Filter_Button"
                        variant="light"
                      >
                        Moderators
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {users &&
                users
                  .sort((a, b) => b.reputation - a.reputation)
                  .filter((user) =>
                    user?.full_name.toLowerCase().includes(filterText)
                  )
                  .map((user, index) => {
                    return (
                      <div key={index} className="col-3 mb-3">
                        <UserCard user={user} />
                      </div>
                    );
                    // return <p>{tag?.tagname}</p>
                  })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
