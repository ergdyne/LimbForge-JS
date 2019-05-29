import React from 'react'
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'
import {saveAs} from 'file-saver'
import Canvas from './Canvas'
import { forearm, urls } from '../testData'
import STLViewer from 'stl-viewer'

export default class Downloader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
     
    }
  }


  createZip=()=> {
    ///OH, another set up urls....
    var ur = urls

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

  render() {
    console.log(urls[0].link)
    return (
      <div>
        <button onClick={this.download}>{`Download`}</button>
        <STLViewer
          url={urls[0].link}
          model={urls[0].link}
          width={400}
          height={400}
          modelColor='#B92C2C'
          backgroundColor='#EAEAEA'
          rotate={true}
          orbitControls={true}
        />
      </div>
    )
  }
}