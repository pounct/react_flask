import React, { useState, useEffect } from 'react';
import './App.css';
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {
  const [articles, setArticles] = useState([]);
  const [editedArticle, setEditedArticle] = useState(null);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/get',{
      'method':'GET',
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  },[]);
  const editArticle = (article) => {
    setEditedArticle(article)
  }
  const updatedArticle = (article) => {
    const newArticles = articles.map(myArticle => {
      if (myArticle.id === article.id) {
        return article
      } else {
        return myArticle
      }      
    })
    setArticles(newArticles)
  }
  const openForm = () => {
    setEditedArticle({title:'', body:''})
  }
  const insertedArticle = (article) => {
    const newArticles = [...articles, article]
    setArticles(newArticles)
  }
  const deleteArticle = (article) => {
    const newArticles = articles.filter(myArticle => {
      if (myArticle.id === article.id) {
        return false;
      } else {
        return true
      }      
    })
    setArticles(newArticles)
  }

  return (
    <div className="App">
      <div className = "row">
        <div className = "col">
          <h1>Pounct Language Alphabet</h1>
        </div>
        <div className = "col">
          <button 
          className = "btn btn-success"
          onClick = {openForm}
          >New Article</button>
        </div>
      </div>
      
      <br/>
      <br/>
      <ArticleList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle}/>
      {editedArticle ? 
      <Form article = {editedArticle} updatedArticle = {updatedArticle} insertedArticle = {insertedArticle}/>
      :null}
      
    </div>
  );
}

export default App;
