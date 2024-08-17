

import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ChromePicker } from 'react-color';

// Define default color map
const defaultColorMap = {
  RED: { color: 'red' },
  GREEN: { color: 'green' },
  BLUE: { color: 'blue' },
  ORANGE: { color: 'orange' },
};

function TextEditor({ editorState, onEditorChange }) {
  const [color, setColor] = useState('#000000'); // Default color
  const [showColorPicker, setShowColorPicker] = useState(false); // Toggle color picker visibility

  // Handle text color change
  const handleColorChange = (newColor) => {
    const selectedColor = `color-${newColor.hex}`.toUpperCase(); // Create unique inline style
    setColor(newColor.hex);
    applyColor(selectedColor);
  };

  // Apply the selected color to the editor state
  const applyColor = (color) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.applyInlineStyle(contentState, selection, color);
    onEditorChange(EditorState.push(editorState, newContentState, 'change-inline-style'));
  };

  // Handle inline style toggle (such as bold, italic)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Define style map, including the dynamic color selected
  const styleMap = {
    ...defaultColorMap,
    [`COLOR-${color.toUpperCase()}`]: { color: color }, // Map dynamic color to custom style
  };

  return (
    <div>
      {/* Toolbar for formatting options */}
      <div style={{ marginBottom: '10px' }}>
        {/* Color Picker Button */}
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{ marginRight: '10px' }}
        >
          Pick Color
        </button>
        {/* Conditional rendering of color picker */}
        {showColorPicker && (
          <ChromePicker
            color={color}
            onChangeComplete={handleColorChange}
          />
        )}
      </div>

      {/* Draft.js Editor */}
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
        <Editor
          editorState={editorState}
          onChange={onEditorChange}
          handleKeyCommand={handleKeyCommand} // Handle keyboard commands
          customStyleMap={styleMap} // Apply custom style map
          placeholder="Start typing your text..."
        />
      </div>
    </div>
  );
}

export default TextEditor;


/*import React,{useState} from 'react';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ChromePicker } from 'react-color'; // Import color picker


// StyleButton component to handle Bold, Italic, and Heading options
function StyleButton({ label, onToggle, styles,design  }) {
  const styleMap = {
    'RED': { color: 'red' },
    'GREEN': { color: 'green' },
    'BLUE': { color: 'blue' },
    'ORANGE': { color: 'orange' },
  };

  return (
    <button className='btn'
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(styles);
      }}
      style={{ marginRight: '10px',design }}
    >
      {label}
    </button>
  );
}
const defaultColorMap = {
  'RED': { color: 'red' },
  'GREEN': { color: 'green' },
  'BLUE': { color: 'blue' },
  'ORANGE': { color: 'orange' },
};

function TextEditor({ editorState, onEditorChange }) {

  const [color, setColor] = useState('black'); // Default color
  const [showColorPicker, setShowColorPicker] = useState(false); // Toggle color picker visibility
  const [EditorText, SetEditorText] = useState(false); // Toggle color picker visibility

  const OnchangeText=()=>{
    SetEditorText(EditorText);
    onEditorChange(editorState)
  }
  // Handle text color change
  const handleColorChange = (color) => {
    const newColor = color.hex.toUpperCase(); // Convert color to uppercase
    setColor(newColor);
    const newState = RichUtils.toggleInlineStyle(editorState, newColor);
    onEditorChange(newState);
    setShowColorPicker(!showColorPicker)
  };

  // Define color map including custom color
  const styleMap = {
    ...defaultColorMap,
    [color]: { color: color },
  };
  // Handle inline styles (bold, italic)
  const handleInlineStyle = (style) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Handle block styles (headings)
  const handleBlockStyle = (blockType) => {
    onEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  //const handleColorChange = (color) => {
    //const newState = RichUtils.toggleInlineStyle(editorState, color);
   // onEditorChange(newState);
 // };

  return (
    <div style={{backgroundColor:'white'}}>*/
      {/* Toolbar for formatting options */}
     /* <div style={{ marginBottom: '10px' }}>*/
        {/* Bold Button */}
       // <StyleButton label="Bold" onToggle={handleInlineStyle} styles="BOLD" style={{FontWeight:'900'}}  />
        {/* Italic Button */}
        //<StyleButton label="Italic" onToggle={handleInlineStyle} styles="ITALIC" style={{FontStyle:'italic'}} />
        {/* Heading Button */}
      /*  <StyleButton label="H1" onToggle={handleBlockStyle} styles="header-one" />
        <StyleButton label="H2" onToggle={handleBlockStyle} styles="header-two" />
        <StyleButton label="H3" onToggle={handleBlockStyle} styles="header-three" />
        <StyleButton label="H4" onToggle={handleBlockStyle} styles="header-four" />
        <StyleButton label="Red" onToggle={handleColorChange} styles="RED" />
        <StyleButton label="Green" onToggle={handleColorChange} styles="GREEN" />
        <StyleButton label="Blue" onToggle={handleColorChange} styles="BLUE" />
        <StyleButton label="Orange" onToggle={handleColorChange} styles="ORANGE" />
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{ marginRight: '10px' }}
        >
          Pick Color
        </button>
    {showColorPicker && (
          <ChromePicker
            color={color}
            onChangeComplete={handleColorChange}
          />
        )}

      </div>


      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
        <Editor
          editorState={EditorText}
          onChange={OnchangeText}
          placeholder="Start typing your text..."
        />
      </div>
    </div>
  );
}

export default TextEditor;
*/
