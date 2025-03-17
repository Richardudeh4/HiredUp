import {Editor} from "@tiptap/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { Bold, Heading1, Heading2, Heading3, Italic, Strikethrough } from "lucide-react";
import { cn } from "@/lib/utils";
interface iAppProps{
    editor: Editor | null;
}
export default function MenuBar({editor}: iAppProps){
    if(!editor){
        return null;
    }
return(
<div className="border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
    <TooltipProvider>
        <div className="flex flex-wrap gap-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" 
                    pressed={editor.isActive("bold")}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                        editor.isActive("bold") && "bg-muted text-muted-foreground"
                    )}
                    >
                        <Bold/>
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                    bold
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" 
                    pressed={editor.isActive("italic")}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                        editor.isActive("italic") && "bg-muted text-muted-foreground"
                    )}
                    >
                      <Italic/>
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent className="">
                    italic
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" 
                    pressed={editor.isActive("strike")}
                    onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                    className={cn(
                        editor.isActive("strike") && "bg-muted text-muted-foreground"
                    )}
                    >
                      <Strikethrough/>
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent className="">
                    strike
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" 
                    pressed={editor.isActive("heading", {level:1})}
                    onPressedChange={() => editor.chain().focus().toggleHeading({level:1}).run()}
                    className={cn(
                        editor.isActive("heading", {level:1}) && "bg-muted text-muted-foreground"
                    )}
                    >
                      <Heading1/> 
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent className="">
                    Heading 1
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" 
                    pressed={editor.isActive("heading", {level:2})}
                    onPressedChange={() => editor.chain().focus().toggleHeading({level:2}).run()}
                    className={cn(
                        editor.isActive("heading", {level:2}) && "bg-muted text-muted-foreground"
                    )}
                    >
                      <Heading2/> 
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent className="">
                    Heading 2
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" 
                    pressed={editor.isActive("heading", {level:3})}
                    onPressedChange={() => editor.chain().focus().toggleHeading({level:3}).run()}
                    className={cn(
                        editor.isActive("heading", {level:3}) && "bg-muted text-muted-foreground"
                    )}
                    >
                      <Heading3/> 
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent className="">
                    Heading 3
                </TooltipContent>
            </Tooltip>
        </div>
    </TooltipProvider>
</div>
)
}