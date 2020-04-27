<template>
  <div id="app">
    <div class="header">
      <h1 class="header__heading">
        Notifications
      </h1>
    </div>
    <router-view/>
  </div>
</template>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: "Roboto", sans-serif;;
  }

  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .header {
    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color: #42b983;
  }

  .header__heading {
    margin: 0;
    text-align: center;
  }

  .confirm-form__container {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(128, 128, 128, 0.3);
    z-index: 2;
  }

  .confirm-form {
    margin: auto auto;
    width: 300px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #42b983;
    border-radius: 7px;
    z-index: 3;
  }

  .confirm-form__buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .confirm-form__button {
    width: 80px;
    height: 30px;
    margin-right: 10px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    background-color: #555657;
    border-radius: 4px;
    border: 1px solid #555657;
    cursor: pointer;
    color: #fff;
    transition: 0.2s;
  }

  .confirm-form__button:hover {
    background-color: #636566;
  }
</style>
