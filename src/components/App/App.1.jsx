
import React, { useRef, useState, Fragment, useEffect } from 'react'

import * as _ from 'underscore'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
var randomColor = require('randomcolor'); 
function Boxes(props) {
 // console.log(props)

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
  // const [active, setActive] = useState(false)

  // useFrame(() => {
  //   if (hovered && !active) {
  //   }
   
  // })
  const rotateTest = () => {
    mesh.current.rotateX(THREE.Math.degToRad(90));
  }
 
 let  randColor = randomColor({ luminosity: 'bright',
 format: 'rgb'}); // Math.floor(Math.random()*16777215).toString(16);

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={e => rotateTest()}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      userData={{ test: "hello" }}>
      <boxBufferGeometry attach="geometry" args={props.size} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : `${randColor}`}
      //  map ={new THREE.TextureLoader().load( '/boxtexture.png' )} 
       
       />

    </mesh>
  )
}
// const Cube = () => {
//   return (
//     <mesh>
//       <boxBufferGeometry attach="geometry" />
//       <meshBasicMaterial attach="material" color="hotpink" opacity={0.5} transparent />
//     </mesh>
//   )
// }

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
  extend({ OrbitControls })
  const Scene = () => {
    const {
      camera,
      gl: { domElement }
    } = useThree()
    return (
      <>
           <Terrain>
            
            </Terrain>
            <Boxes boxes={values.boxes} ></Boxes>
        <orbitControls args={[camera, domElement]} />
      </>
    )
  }
  
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
  });
  const checkGround=()=>{
    var groundBoxes = values.boxes.filter(f=> ( f.size[1]/2 - f.position[1]===0) );
   if(groundBoxes.length>0){
      let firstXYZ = groundBoxes[groundBoxes.length-1].position[0] +  groundBoxes[groundBoxes.length-1].size[0]/2
      console.log(firstXYZ);
    }
 
   }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const ref = useRef(null)
  useEffect(() => {
  //  setHeight(ref.current.clientHeight)
  })
 
  const addBoxes = (e) => {
    e.preventDefault()
    checkGround()
  let SameSizeBox =  values.boxes.filter(f=>f.size[0]===values.boxWidth && f.size[2]===values.boxLength);
  let last = SameSizeBox.length;
 

    let x1 = values.xDistance+values.boxWidth/2;
    let y1 = values.yDistance+ values.boxHeight/2
    let z1 = values.zDistance+values.boxLength/2;
    let x = values.xDistance;// + 1.5;
    let y = values.yDistance;
    let z = values.zDistance+values.boxLength;// + 1.5;
    if(z>8 && last===0){
      
       z = -10;
      // x = -7;
       y =y+ 3;
     if(y>3){
      y = 0;
      x = x+3;
     }
    }
    if(last>0) {
      var totalHeight = SameSizeBox.reduce(function (sum, element) {
        return sum + (+element.size[1]) 
    }, 0);

    if(SameSizeBox[last-1].position[1]>8){
      x1 =SameSizeBox[last-1].position[0]+ values.boxWidth;
      y1 =  values.boxHeight/2;
      z1 = SameSizeBox[last-1].position[2];
    }
    else {

      x1 = SameSizeBox[last-1].position[0];
      y1 =   SameSizeBox[last-1].position[1]+ SameSizeBox[last-1].size[1]/2+values.boxHeight/2;
      z1 = SameSizeBox[last-1].position[2];
    }
       


        setValues({ ...values, boxes: [...values.boxes, { position: [x1, y1,z1], size: [values.boxWidth, values.boxHeight, values.boxLength]}],
       
          boxWidth:_.random(1, 3),
          boxHeight:_.random(1,3),
          boxLength:_.random(1, 3)
         
         });
    }
   else {
    setValues({ ...values, boxes: [...values.boxes, { position: [x1, y1,z1], size: [values.boxWidth, values.boxHeight, values.boxLength]}],
    xDistance: x ,
     yDistance: y,
      zDistance: z ,
      boxWidth:_.random(1, 3),
      boxHeight:_.random(1,3),
      boxLength:_.random(1, 3)
     
     });
   }
   // console.log(_.random(1, 4)) 
   

  }
  var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight,1, 10000 );
  camera.position.set( 500, 500, 1300 );
 // camera.lookAt( 0, 0, 0 );
  camera.zoom=100
  // var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
	// 			geometry.rotateX( - Math.PI / 2 );
 
  // useRender(({ gl, canvas, scene, camera }) => console.log("i'm in the render-loop"))

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
        <Canvas style={{height:500,width:800} }  resize={{scroll: true}}
          camera={{ ...camera }}	  >

          <ambientLight />
          <pointLight position={[10, 10, 10]} />
      

        <Scene />
        </Canvas>

      </div>

    </div>

  )

}

export default App;