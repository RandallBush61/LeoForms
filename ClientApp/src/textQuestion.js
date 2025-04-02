import Form from 'react-bootstrap/Form';

var questionIdGlobal;

const TextQuestion = (text, questionId) => {
    questionIdGlobal = questionId;
    return (
        <div className="TextQuestion">
            <Form.Label>{text}</Form.Label>
            <Form.Control type = "text"/>
        </div>
    );
}

export {TextQuestion};