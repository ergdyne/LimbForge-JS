import React from 'react'
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import Canvas from './Canvas'
import { forearm } from '../testData'
import urlGenerator from '../functions/urlGenerator'

export default class Download extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      preview: false,
    }
  }



  createZip = () => {
    //as Forearm is always the item, it is imported from testdata
    var ur = urlGenerator(this.props.patient, forearm)

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

  download = () => {
    console.log('Downloading...')
    this.createZip()
  }

  preview = () => {
    let x = this.state.preview
    this.setState({ preview: !x })
  }

  render() {
    return (
      <div>
        <button onClick={this.preview}>{`Preview`}</button>
        <span>{`   `}</span>
        <button onClick={this.download}>{`Download`}</button>
        {this.state.preview ?
          <Canvas stls={urlGenerator(this.props.patient, forearm).filter(x => !(x.type === 'coupler'))} modelColor={`#00ff00`} /> :
          <div />}

      </div>
    )
  }
}

//TODO this will take some though about what kind of props to bring in
/**
 * Option 1-> bring in the amputation/sizes/gender/ect and convert to stl objects(link,filename,type, position, rotation)
 * //Props not option 1.
 * Option 2-> bring in the amputation/sizes/gender/ect -> send to function -> get back stl objects
 * //I like this as I can centeralize changes
 * Option 3 -> complete redesign and push everything serverside
 * Option 4 -> have each stl objects stored serverside and do a query for it (this can be part of 2)
 * //This requires the a bit of complete redesign to do upload to server + version control there.
 */