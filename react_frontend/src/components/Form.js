import React, {useState, useEffect} from 'react'
import APIservice from './APIservice';

function Form(props) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() =>{
        setTitle(props.article.title)
        setBody(props.article.body)
    },[props.article])

    const updateArticle = () => {
        APIservice.UpdateArticle(props.article.id, {title, body})
        .then(resp => props.updatedArticle(resp))
        .catch(error => console.log(error))
    }
    const insertArticle = () => {
        APIservice.InsertArticle({title, body})
        .then(resp => props.insertedArticle(resp))
        .catch(error => console.log(error))
    }
    return (
        <div>
            {props.article ? (
                <div className = 'mb-3'>
                    <label htmlFor ='title' className = 'form-label'>Title</label>
                    <input type = 'text'
                    className = 'form-control'
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder = 'Please Enter Title'
                    />
                    <label htmlFor ='Body' className = 'form-label'>Body</label>
                    <textarea
                    className = 'form-control'
                    value = {body}
                    onChange = {(e) => setBody(e.target.value)}
                    rows = '5'
                    placeholder = 'Please Enter Description'
                    />
                    {
                        props.article.id 
                        ? <button
                        onClick = {updateArticle}
                        className = 'btn btn-success mt-3'
                        >Update</button>
                        : <button
                        onClick = {insertArticle}
                        className = 'btn btn-success mt-3'
                        >Insert</button>
                    }
                    
                </div>
            ):null

            
            }
        </div>
    )
}

export default Form
