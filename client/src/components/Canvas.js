
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import STLLoaderModule from 'three-stl-loader'
import OrbitControlsModule from 'three-orbit-controls'
import { ScaleLoader } from 'react-spinners';

const STLLoader = STLLoaderModule(THREE);
const OrbitControls = OrbitControlsModule(THREE);

export default class Canvas extends Component {

  componentDidMount() {
    this.renderModel(this.props);
  }

  onLoadBuilder(component, scene, camera, controls, distance, renderer) {
    const { width, height, orbitControls, modelColor, onSceneRendered } = component.props
    return (stl) => {
      return (geometry) => {
        console.log(stl.type)
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.center();

        let mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshLambertMaterial({
            overdraw: true,
            color: modelColor,
          }
          ));
        geometry.computeBoundingBox();
        let xDims = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        let yDims = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        let zDims = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        mesh.position.set( stl.position.x, stl.position.y, stl.position.z )
        mesh.name = stl.type
        mesh.rotation.set(0, 0, 0)
        mesh.scale.set(.04, .04, .04)

        mesh.castShadow = true
        mesh.receiveShadow = false

        scene.add(mesh);

        camera = new THREE.PerspectiveCamera(30, width / height, 1, distance);
        camera.position.set(0, 0, Math.max(xDims * 3, yDims * 3, zDims * 3));

        scene.add(camera);


        if (orbitControls) {
          controls = new OrbitControls(camera, ReactDOM.findDOMNode(component));
          controls.enableKeys = false;
          controls.addEventListener('change', () => renderer.render(scene, camera));
        }

        ReactDOM.findDOMNode(this).replaceChild(renderer.domElement,
          ReactDOM.findDOMNode(this).firstChild);

        renderer.render(scene, camera)

        if (typeof onSceneRendered === "function") {
          onSceneRendered(ReactDOM.findDOMNode(renderer.domElement))
        }
      }
    }
  }

  renderModel(props) {
    let camera, controls;
    const { stls, width, height, backgroundColor, sceneClassName } = props;
    let component = this;

    let renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: true
    })
    renderer.setSize(width, height)
    renderer.setClearColor(backgroundColor, 1)
    renderer.domElement.className = sceneClassName

    let scene = new THREE.Scene();
    let distance = 10000;

    //load function //curry instead?
    let onLoad = this.onLoadBuilder(component, scene, camera, controls, distance, renderer)
    //end onload function

    const loader = new STLLoader();

    console.log(stls)
    stls.map(x => loader.load(x.link, onLoad(x)))

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false
    }
    return true
  }

  componentDidUpdate(nextProps, nextState) {
    this.renderModel(nextProps);
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{
          width: this.props.width,
          height: this.props.height,
          overflow: 'hidden',
        }}
      >
        <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        </div>
      </div>
    );
  };
}

Canvas.propTypes = {
  stls: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  modelColor: PropTypes.string,
  sceneClassName: PropTypes.string,
  onSceneRendered: PropTypes.func,
}

Canvas.defaultProps = {
  backgroundColor: '#EAEAEA',
  modelColor: '#B92C2C',
  height: 400,
  width: 400,
  rotate: true,
  orbitControls: true,
  sceneClassName: '',
}