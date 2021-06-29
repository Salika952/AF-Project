import React, {Component} from 'react';
import EditorNavbar from "../../Components/navbar/editorNavbar";

class Editor extends Component {
    render() {
        return (
            <div>
                <EditorNavbar/>
                <h1>Hello Editor</h1>
            </div>
        );
    }
}

export default Editor;