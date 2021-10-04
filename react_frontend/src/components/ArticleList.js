
import React from 'react'
import APIservice from './APIservice'

function ArticleList(props) {
    const editArticle = (article) => {
        props.editArticle(article)
    }
    const deleteArticle = (article) => {
        APIservice.DeleteArticle(article.id)
        .then(() => props.deleteArticle(article))
    }
    return (
        <div>
            {props.articles && props.articles.map(article => {
                return (
                <div key = {article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                    <p>{article.date}</p>
                    <div className = 'row'>
                        <div className = 'col-md-1'>
                            <button 
                            className = 'btn btn-primary'
                            onClick = {() => editArticle(article)}
                            >Update</button>
                        </div>
                        <div className = 'col'>
                            <button 
                            className = 'btn btn-danger'
                            onClick = {() => deleteArticle(article)}
                            >Delete</button>
                        </div>
                    </div>
                    <hr/>
                </div>
                )
            })}
            
        </div>
    )
}

export default ArticleList
