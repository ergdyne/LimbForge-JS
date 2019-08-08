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
    //As Forearm is always the item, it is imported from testdata.
    //Expanding to add other devices will complicate this area.
    var ur = urlGenerator({...this.props.patient, measurements: this.props.measurements}, forearm)

    //Copied from LimbForge code
    //Can move some of this functionality to a common file and create another Component for downloading instruction.
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
    const p = this.props.patient
    const patientName = `${(p.firstName) ?`${p.firstName}-`: ''}${(p.lastName) ? p.lastName : ''}`

    zip.generateAsync({ type: "blob" })
      .then(function callback(blob) {
        // see FileSaver.js
        //TODO add a spinner.
        saveAs(blob, patientName + "limbforge_files.zip");
      }, function (e) {
        console.log('oh noes', e);
      });
    //End copied from LimbForge Code.
  }

  //Having this is not required as it could just be createZip() or download()
  download = () => {
    console.log('Downloading...')
    this.createZip()
  }

  //Callback for preview button. When true, show the canvas.
  preview = () => {
    let x = this.state.preview
    this.setState({ preview: !x })
  }

  render() {
    //CSS
    return (
      <div>
        <button onClick={this.preview}>{`Preview`}</button>
        <span>{`   `}</span>
        <button onClick={this.download}>{`Download`}</button>
        {this.state.preview ?
          <Canvas stls={urlGenerator({...this.props.patient, measurements: this.props.measurements}, forearm).filter(x => !(x.type === 'coupler'))} modelColor={`#00ff00`} /> :
          <div />}

      </div>
    )
  }
}

//TODO add the PropTypes...
