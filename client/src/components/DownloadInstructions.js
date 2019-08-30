import React from 'react'
import JSZip from 'jszip'
import urlToPromise from '../functions/urlToPromise'
import { saveAs } from 'file-saver'

const createZip = () => {
  //Copied from LimbForge (Ruby version).
  var zip = new JSZip();

  zip.file('instructions.txt', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/instructions.txt'), { binary: true });
  zip.file('Passive.Transradial.Device.Assembly.Manual.pdf', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/Passive.Transradial.Device.Assembly.Manual.pdf'), { binary: true });

  zip.generateAsync({ type: "blob" })
    .then(function callback(blob) {
      saveAs(blob, "limbforge_instruction.zip");
    }, function (e) {
      console.log('oh noes', e);
    });
  //End copied from LimbForge Code.
}

const DownloadInstructions = () =>{
  return(
    <button className="right" onClick={createZip}>{`Site Instructions`}</button> 
  )
}

export default DownloadInstructions