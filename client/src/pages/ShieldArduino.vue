<script setup>
import { Application } from "@splinetool/runtime";
import utils from "../helpers/utils";

utils.onLoad(() => {
  const canvas = document.getElementById("canvas3d");
  const app = new Application(canvas);
  app.load("https://draft.spline.design/zuKGdO5PU3fdKhUW/scene.splinecode");
});
</script>

<template>
  <h1 class="w-full font-bold text-5xl text-center">
    Caratteristiche Arduino UNO
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 w-full">
    <div class="w-full justify-center align-middle">
      <img src="/showcase/atmega.png" style="width: 100%; height: auto" />
    </div>
    <div class="m-10">
      <h2 class="font-bold text-3xl w-full text-right">Microcontrollore</h2>
      <p class="mt-5 text-xl">
        La scheda Arduino UNO è basata sul microcontrollore ATmega328P ed è uno
        dei modelli più popolari della famiglia Arduino.
      </p>
      <p class="mt-3 text-xl">
        La ram è integrata all'interno del microcontrollore ed è di
        <strong>32KB</strong>.
      </p>
      <p class="mt-3 text-xl">
        Questo dispositivo è in grado di operare tra gli <strong>1.8</strong> e
        <strong>5.5</strong> volts.
      </p>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 w-full">
    <div class="m-10">
      <h2 class="font-bold text-3xl w-full text-left">Facile da programmare</h2>
      <div class="flex h-full align-middle">
        <p class="mt-5 text-xl">
          Questa sheda è molto facile da programmare rispetto ad altre<br />
          Grazie alla sua porta <strong>USB type B</strong> è possibile
          trasferire dati dal computer alla scheda in poco tempo.
        </p>
      </div>
    </div>
    <div class="w-full justify-center align-middle">
      <img
        src="/showcase/programmabile.png"
        style="width: 100%; height: auto"
      />
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 w-full">
    <div class="w-full justify-center align-middle">
      <img src="/showcase/power.png" style="width: 80%; height: auto" />
    </div>
    <div class="m-10">
      <h2 class="font-bold text-3xl w-full text-left">Alimentazione</h2>
      <p class="mt-5 text-xl">
        Arduino uno, dopo averne terminata la programmazione, può essere
        collegato alla rete elettrica senza bisogno di un pc.
      </p>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 w-full">
    <div class="w-full justify-center align-middle">
      <img src="/showcase/pins.png" style="width: 100%; height: auto" />
    </div>
    <div class="m-10">
      <h2 class="font-bold text-3xl w-full text-right">Pins</h2>
      <div class="flex h-full align-middle">
        <p class="mt-5 text-xl">
          L'Arduino UNO ha 14 pin di input/output digitali e 6 pin di ingresso
          analogici <br />
          Questi ultimi però, possono essere usati come pin digitali
        </p>
      </div>
    </div>
  </div>
  <h3 class="text-5xl w-full font-bold text-center">Modello 3D</h3>
  <div class="flex w-full justify-center">
    <div style="height: 800px; width: 900px" class="rounded-xl">
      <canvas
        id="canvas3d"
        width="740"
        height="732"
        class="lg:rounded-t-xl"
      ></canvas>
    </div>
  </div>
</template>
