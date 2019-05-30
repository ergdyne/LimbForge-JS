import React from 'react'
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'
import {saveAs} from 'file-saver'
import Canvas from './Canvas'
import {stls } from '../testData'


export default class Download extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      preview:false
    }
  }

  createZip=()=> {
    ///OH, another set up urls....
    var ur = stls

    function urlToPromise(url) {
      return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }

    var zip = new JSZip();
    ur.forEach((url) => {
      var filename = url.name + '.stl';
      zip.file(filename, urlToPromise(url.link), { binary: true });
    });

    //These are the files we want another download for?
    zip.file('instructions.txt', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/instructions.txt'), { binary: true });
    zip.file('Passive.Transradial.Device.Assembly.Manual.pdf', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/Passive.Transradial.Device.Assembly.Manual.pdf'), { binary: true });

    // when everything has been downloaded, we can trigger the dl
    const patientName = 'hi-'

    zip.generateAsync({ type: "blob" })
      .then(function callback(blob) {
        // see FileSaver.js
        saveAs(blob, patientName + "limbforge_files.zip");
      }, function (e) {
        console.log('oh noes', e);
      });
  }

  download = () =>{
    console.log('Downloading...')
    this.createZip()
  }

  preview = () =>{
    let x = this.state.preview
    this.setState({preview:!x})
  }

  render() {
    return (
      <div>
        <button onClick={this.preview}>{`Preview`}</button>
        <span>{`   `}</span>
        <button onClick={this.download}>{`Download`}</button>
        {this.state.preview?
          <Canvas stls={stls.filter(x=> !(x.type==='coupler'))} modelColor={`#00ff00`}/>:
          <div/>}
        
      </div>
    )
  }
}