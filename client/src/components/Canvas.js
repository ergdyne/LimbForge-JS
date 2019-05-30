
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

  //Curry the onLoad (adds mesh to scene) function with common aspects of the scene.
  onLoadBuilder(component, scene, camera, renderer) {
    const { onSceneRendered } = component.props
    const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0x0f2045, shininess: 0 } )
    //curry the STL object to get details such as mesh name and position/rotation
    return (stl) => {
      //Return the standard load function which takes a geometry
      return (geometry) => {
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.center();

        let mesh = new THREE.Mesh(geometry, material)

        mesh.name = stl.type
        mesh.rotation.set(stl.rotation.x, stl.rotation.y, stl.rotation.z)
        mesh.position.set(stl.position.x, stl.position.y, stl.position.z)
        mesh.scale.set(.04, .04, .04)

        mesh.castShadow = true
        mesh.receiveShadow = false

        scene.add(mesh);

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
    let controls;
    const { stls, width, height, backgroundColor, sceneClassName, orbitControls } = props;
    let component = this;

    let renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: true
    })
    renderer.setSize(width, height)
    renderer.setClearColor(backgroundColor, 1)
    renderer.domElement.className = sceneClassName

    let scene = new THREE.Scene()
    let distance = 500

    var spotLight = new THREE.SpotLight(0xaaaaaa);
    spotLight.position.set(-50, -50, -50);
    scene.add(spotLight)

    let camera = new THREE.PerspectiveCamera(30, width / height, 1, distance)
    camera.up.set(0, 0, 1)
    camera.position.set(0, -44, 20)
    scene.add(new THREE.AmbientLight(0x999999))
    scene.add(camera);

    if (orbitControls) {
      controls = new OrbitControls(camera, ReactDOM.findDOMNode(component));
      controls.enableKeys = false;
      controls.addEventListener('change', () => renderer.render(scene, camera));
    }

    //curried onLoad with common elements
    let onLoad = this.onLoadBuilder(component, scene, camera, renderer)

    const loader = new STLLoader();

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
  modelColor: '#11FF11',
  height: 400,
  width: 400,
  rotate: true,
  orbitControls: true,
  sceneClassName: '',
}