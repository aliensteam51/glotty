import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'

export class FileUploader extends PureComponent {
  handleUploadFile(event) {
    const file = event.target.files[0]
    console.log(file)
    const reader = new FileReader()
    reader.readAsText(file)
    reader.addEventListener('loadend', () => {
      console.log(reader.result)
    })
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleUploadFile} />
      </div>
    )
  }
}

export default FileUploader
