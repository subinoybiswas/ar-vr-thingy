import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroTrackingReason,
  ViroNode,
  Viro3DObject,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroOrbitCamera,
  ViroScene,
  ViroSkyBox,
  ViroMaterials,
  ViroSceneNavigator,
  ViroVRSceneNavigator,
  ViroARCamera,
  Viro360Image,
  Viro360Video,
} from "@viro-community/react-viro";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }
  var styles = StyleSheet.create({
    textStyle: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 18,
      color: '#FFFFFF',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  var materials = ViroMaterials.createMaterials({
    heart: {
      lightingModel: "Blinn",
      diffuseTexture: require('./assets/res/Heart_D3.jpg'),
      specularTexture: require('./assets/res/Heart_S2.jpg'),
      writesToDepthBuffer: true,
      readsFromDepthBuffer: true,
    },
  });
  return (
    <ViroScene style={styles.container}>
      <ViroARCamera>

        <ViroOrbitCamera position={[0, 0, -0]} active={true} focalPoint={[0, 0, -1]} />
        <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />

        <ViroAmbientLight color="#aaaaaa" />

        <ViroNode position={[0, 0, -1]} >
          <Viro3DObject source={require('./assets/res/heart.obj')}
            materials={["heart"]} type="OBJ" />
        </ViroNode>
        <ViroText text="Heart" position={[0.0, 0.0, -3]} style={styles.textStyle}
          transformBehaviors={["billboardY"]} />
      </ViroARCamera>
    </ViroScene>
  );
};

export default () => {
  return (
    <ViroVRSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
