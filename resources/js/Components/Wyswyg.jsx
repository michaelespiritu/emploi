import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function Wyswyg({ value, onChange, ...props }) {
    const [editorValue, setEditorValue] = useState(value);

    const handleChange = (content) => {
        setEditorValue(content);
        onChange(content); // Call the onChange prop with the new content
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
        ],
    };

    return (
        <ReactQuill
            theme="snow"
            modules={ modules }
            value={ editorValue }
            onChange={ handleChange }
            { ...props }
        />
    );
}