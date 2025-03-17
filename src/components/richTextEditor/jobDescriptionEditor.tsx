import React from 'react'
import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import  MenuBar from './menuBar';
export default function JobDescriptionEditor() {
    const editor = useEditor({
            extensions: [StarterKit],
            immediatelyRender: false,
    });

  return (
    <div className='w-full border rounded-lg overflow-hidden bg-card'>
        <MenuBar editor={editor}/>
       <EditorContent editor={editor}/>
    </div>
  )
}
