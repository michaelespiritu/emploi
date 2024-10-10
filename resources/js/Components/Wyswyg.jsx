import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Textarea from './Textarea';

export default function Wyswyg({ initialValue, onChange, ...props }) {
    const [editorValue, setEditorValue] = useState(initialValue || '');

    useEffect(() => {
        // Update the editorValue when the initialValue prop changes
        setEditorValue(initialValue || '');
    }, [initialValue]);

    const handleChange = (content) => {
        // Check if the content is just the default empty paragraph
        console.log(content)
        if (content === '<p><br></p>') {
            setEditorValue(''); // Set editorValue to empty
            onChange(''); // Call onChange with an empty string
        } else {
            setEditorValue(content);
            onChange(content); // Call the onChange prop with the new content
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