
import React, { useRef, useState, Fragment, useEffect } from 'react'
import FormInput from '../util/component/FormInput'
import { Canvas, useFrame, render } from 'react-three-fiber'
import * as THREE from 'three';
function Boxes(props) {
  console.log(props)
  var d = 0;
  return (
    <Fragment>
      {
        props.boxes.map((n, idx) =>

          <Box key={idx} position={n.position} size={n.size} />
        )

      }



    </Fragment>
  )

}
function Box(props) {

  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame(() => {
    if (hovered && !active) {
    }
   
  })
  const rotateTest = () => {
    mesh.current.rotateX(THREE.Math.degToRad(90));
  }


  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={e => rotateTest()}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      userData={{ test: "hello" }}>
      <boxBufferGeometry attach="geometry" args={props.size} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} map ={new THREE.TextureLoader().load( '/boxtexture.png' )}  />

    </mesh>
  )
}

const Terrain = () => {

  const mesh = useRef();

  // Raf loop
  useFrame(() => {
  //  mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={mesh}>

    <gridHelper args={[20, 20]}></gridHelper>
       {/* <planeBufferGeometry attach="geometry" args={[25, 25, 75, 75]} /> */}
      {/* <meshPhongMaterial
        attach="material"
        color={"hotpink"}
        specular={"hotpink"}
        shininess={3}
        flatShading 
      /> */}
    </mesh>
  );
};


const App = () => {
  const [height, setHeight] = useState(0)
  const [values, setValues] = useState({
    boxHeight: 1,
    boxLength: 1,
    boxWidth: 1,
    noOfBoxes: 1,
    xDistance: -10,
    yDistance: 0,
    zDistance: -10,
    positions: [],
    boxes: []
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const ref = useRef(null)
  useEffect(() => {
    setHeight(ref.current.clientHeight)
  })
  var d = 0;
  const addBoxes = (e) => {
    e.preventDefault()
    let x = values.xDistance;// + 1.5;
    let y = values.yDistance;// + 1.5;
    let z = values.zDistance;// + 1.5;
    if(values.zDistance>9){
      z = -10;
     // x = values.xDistance + 1.5;
      y = values.yDistance+1.5;
     if(y>6){
      y = 0;
      x = values.xDistance + 1.5;
     }
    }
    else {
      z = values.zDistance  + 1.5;
    }

    setValues({ ...values, boxes: [...values.boxes, { position: [values.xDistance, values.yDistance, values.zDistance], size: [values.boxWidth, values.boxHeight, values.boxLength] }], xDistance: x , yDistance: y, zDistance: z });

  }
  var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight,1, 10000 );
  camera.position.set( 500, 500, 1300 );
 // camera.lookAt( 0, 0, 0 );
  camera.zoom=100
  // var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
	// 			geometry.rotateX( - Math.PI / 2 );
  return (
    <div
    >
      <h1 >Shipping Container Loading Optimizer</h1>

      <form onSubmit={addBoxes}>
        Height: <input type="text" value={values.boxHeight} onChange={handleChange("boxHeight")} />
        Widtht: <input type="text" value={values.boxWidth} onChange={handleChange("boxWidth")} />
        Length:<input type="text" value={values.boxLength} onChange={handleChange("boxLength")} />

        No. of Boxes:<input type="text" value={values.noOfBoxes} onChange={handleChange("noOfBoxes")} />
        <button type="submit" >Submit </button>
        <hr>
        
        </hr>
        Current X: {values.xDistance} | Current Y: {values.yDistance} | Current Z: {values.zDistance}
      </form>
      <div ref={ref}>
        <Canvas style={{height:500,width:800}}
          camera={{ ...camera }}	  >

          <ambientLight />
          <pointLight position={[10, 3, 1]} />
          <Terrain>
            
          </Terrain>
          <Boxes boxes={values.boxes} ></Boxes>
         
        </Canvas>

      </div>

    </div>

  )

}

export default App;