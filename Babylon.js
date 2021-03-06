engine.runRenderLoop(function () {
    sceneToRender.render();
});
const box = BABYLON.MeshBuilder.CreateBox("box", {});
box.position.x = 0.5;
box.position.y = 1;
const alpha =  Math.PI/4;
const beta = Math.PI/3;
const radius = 8;
const target = new BABYLON.Vector3(0, 0, 0);
const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
camera.attachControl(canvas, true);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
const boxMaterial = new BABYLON.StandardMaterial("material", scene);
boxMaterial.diffuseColor = BABYLON.Color3.Random();
box.material = boxMaterial;
box.actionManager = new BABYLON.ActionManager(scene);
box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnPickTrigger, 
    function (evt) {
        const sourceBox = evt.meshUnderPointer;

        //move the box upright
        sourceBox.position.x += 0.1;
        sourceBox.position.y += 0.1;

        //update the color
        boxMaterial.diffuseColor = BABYLON.Color3.Random();
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4});
        const xrPromise = scene.createDefaultXRExperienceAsync({
            floorMeshes: [ground]
        });
    }));
    return xrPromise.then((xrExperience) => {
        console.log("Done, WebXR is enabled.");
        return scene;
    });
    createScene().then(sceneToRender => {
        engine.runRenderLoop(() => sceneToRender.render());
    });