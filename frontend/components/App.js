import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import { axiosWithAuth } from '../axios'
import { axios } from 'axios';


const articlesUrl = 'http://localhost:3000/articles'
const loginUrl = 'http://localhost:3000'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') }
  const redirectToArticles = () => { navigate('/articles') }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem("token");
    setMessage('Goodbye!');
    redirectToLogin();
    
  }

  const login = async ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    // setSpinnerOn(true);
    setMessage('');
    setSpinnerOn(true);
    try {
      const response = await axiosWithAuth().post(`http://localhost:9000/api/login`, { username, password });
      localStorage.setItem("token", response.data.token);
     
      redirectToArticles()
      setSpinnerOn(false);
    } catch (error) {
      // Handle login error
      setMessage('Login failed. Please check your credentials.'); // Put the error message in the state
      setSpinnerOn(false); // Turn off the spinner
    }
  }

  const getArticles =  async () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage('');
    setSpinnerOn(true);
    try {
      const response = await axiosWithAuth().get(`http://localhost:9000/api/articles`)
      setArticles(response.data.articles)
      setMessage(response.data.message)
      setSpinnerOn(false)
    } catch(err) {
      if (err.response && err.response.status === 401) {
        redirectToLogin()
        setSpinnerOn(false)
      } else {
        setMessage('Failed to fetch articles');
        setSpinnerOn(fasle);
        console.log(err)
      }
    }

  }

const getArticlesHelp = () => {
return axiosWithAuth().get(`http://localhost:9000/api/articles`).then(res=> res.data)
}

const articleHelper = () => {
  getArticlesHelp().then(res => {
    setArticles(res.articles)
    console.log(res)
  })
}
 
  const postArticle =  async article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    try { 
      const response =  await axiosWithAuth().post(`http://localhost:9000/api/articles`, article)
    setMessage(response.data.message)
    articleHelper()
    } catch (err) {
      console.log(err)
    }
  }

  const updateArticle =  async ({ article_id, article }) => {
    // ✨ implement
    // You got this! 
    try {
     const response =  await axiosWithAuth().put(`http://localhost:9000/api/articles/${article_id}`, article)
     setMessage(response.data.message)
     setCurrentArticleId(null)
    } catch(err) {
      setMessage('ops')
      console.log(err)
    }
  }

  const deleteArticle =  async article_id => {
    // ✨ implement
    try {
      const response = await axiosWithAuth().delete(`http://localhost:9000/api/articles/${article_id}`);
      setMessage(response.data.message)
      articleHelper()
      console.log(response.data.message)
    
    } catch(err) {
      console.log(err)
    }
  }

  


  const checkAuthAndRender = (element) => {
    if (localStorage.getItem("token")) {
      return element;
    } else {
      return <Navigate to='/' />
    }
  };
  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route
            path="/articles"
            element={checkAuthAndRender(
              <>
                <ArticleForm articles={articles} postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId} />
                <Articles deleteArticle={deleteArticle} updateArticle={updateArticle} articles={articles}getArticles={getArticles} setCurrentArticleId={setCurrentArticleId} />
              </>
            )}
          />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
