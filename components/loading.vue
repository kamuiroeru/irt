<template>
  <!-- https://projects.lukehaas.me/css-loaders/ -->
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
$white: #fff;
$black: #222;
$grad: rgba(255, 255, 255, 0) 42%;

@media (prefers-color-scheme: dark) {
  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: $white;
    background: -moz-linear-gradient(left, $white 10%, $grad);
    background: -webkit-linear-gradient(left, $white 10%, $grad);
    background: -o-linear-gradient(left, $white 10%, $grad);
    background: -ms-linear-gradient(left, $white 10%, $grad);
    background: linear-gradient(to right, $white 10%, $grad);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    &:before {
      width: 50%;
      height: 50%;
      background: $white;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      content: "";
    }

    &:after {
      background: $black;
      width: 75%;
      height: 75%;
      border-radius: 50%;
      content: "";
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}

@media (prefers-color-scheme: light) {
  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: $black;
    background: -moz-linear-gradient(left, $black 10%, $grad);
    background: -webkit-linear-gradient(left, $black 10%, $grad);
    background: -o-linear-gradient(left, $black 10%, $grad);
    background: -ms-linear-gradient(left, $black 10%, $grad);
    background: linear-gradient(to right, $black 10%, $grad);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    &:before {
      width: 50%;
      height: 50%;
      background: $black;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      content: "";
    }

    &:after {
      background: $white;
      width: 75%;
      height: 75%;
      border-radius: 50%;
      content: "";
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}

@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
