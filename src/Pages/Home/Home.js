import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import "./Home.css"
import AskQuestion from "../Askquestion/Askquestion"
import Answer from "../AnsQuestion/AnsQuestion"
import Question from "../Community/Question"
import axios from "axios"
import { MdArrowForwardIos } from "react-icons/md"
const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext)
  const [page, setPage] = useState("Home")
  const [allQuestions, setAllQuestions] = useState([])
  let [currrentQuestion, setCurrrentQuestion] = useState([])
  let q = []
  const navigate = useNavigate()
  useEffect(() => {
    if (!userData.user) navigate("/login")
    const fetchQuestions = async () => {
      let questions = await axios.get("https://evangadi-api.onrender.com/api/questions")
      questions = questions.data.data
      setAllQuestions(() => {
        return questions
      })
    }
    fetchQuestions()
  }, [userData.user, navigate])
  return (
    <>
      <div className="home">
        <div className="home__top">
          <button
            onClick={() => {
              navigate("/ask")
            }}
            className="home_topBtn"
          >
            Ask Question
          </button>
          <h6 style={{ padding: 30, marginTop: 30 }}>
            Welcome: {userData.user?.display_name}
          </h6>
        </div>
        <h3 className="home__question">Questions</h3>
        <div className="home__questionLists">
          <div>
            {allQuestions?.map((question) => (
              <div key={question.question_id}>
                <Link
                  to={`/answer/:${question.question_id}`}
                  // state prop used to pass the data along the link
                  state={{
                    question: question,
                    currentUserId: userData.user?.id,
                  }}
                  className="Link">
                  <Question show={question} />
                  <MdArrowForwardIos className="MdArrowForwardIos" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {allQuestions.length < 3 && (
          <div className="home__questionListsBottom" />
        )}
      </div>
    </>
  )
}

export default Home
