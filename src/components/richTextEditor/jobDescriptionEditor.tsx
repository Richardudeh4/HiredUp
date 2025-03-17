import React from 'react'
import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Typogrophy from "@tiptap/extension-typography";
import  MenuBar from './menuBar';
export default function JobDescriptionEditor() {
    const editor = useEditor({
            extensions: [StarterKit,TextAlign.configure({
                types:['heading', 'paragraph']
            }), Typogrophy],
            immediatelyRender: false,
    });

  return (
    <div className='w-full border rounded-lg overflow-hidden bg-card'>
        <MenuBar editor={editor}/>
       <EditorContent editor={editor}/>
    </div>
  )
}
