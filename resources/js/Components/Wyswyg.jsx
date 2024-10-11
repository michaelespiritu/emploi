import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Textarea from './Textarea';

export default function Wyswyg({ initialValue, onChange, ...props }) {
    const [editorValue, setEditorValue] = useState(initialValue || '');

    useEffect(() => {
        setEditorValue(initialValue || '');
    }, [initialValue]);

    const handleChange = (content) => {
        if (content === '<p><br></p>') {
            setEditorValue('');
            onChange('');
        } else {
            setEditorValue(content);
            onChange(content);
        }
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
        <>
            <ReactQuill
                theme="snow"
                modules={ modules }
                value={ editorValue }
                onChange={ handleChange }
                { ...props }
            />
            {/* 
            <textarea
                id="mirrorDescription"
                value={ editorValue }
                readOnly
            /> */}
        </>
    );
}