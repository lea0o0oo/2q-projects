<script setup>
import axios from "axios";
import config from "../../../config";

function register() {
  event.preventDefault();
  document.getElementById("register-btn").disabled = true;
  document.getElementById("alert-error").style.display = "none";
  const username = document.getElementById("username-box").value;
  const password = document.getElementById("password-box").value;
  const adminKey = document.getElementById("admin-key-box").value;

  axios
    .post(`${config.api.baseURL}/account/register`, {
      username: username,
      password: password,
      adminKey: adminKey,
    })
    .then((response) => {
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error(error.response.data);
      document.getElementById("alert-msg").innerText =
        error.response.data.error;
      document.getElementById("alert-error").removeAttribute("style");
    })
    .finally(() => {
      document.getElementById("register-btn").disabled = false;
    });
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Registra</h1>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit="register()">
          <div class="alert alert-error" style="display: none" id="alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span id="alert-msg"></span>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              placeholder="username"
              class="input input-bordered"
              id="username-box"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              id="password-box"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Chiave admin</span>
            </label>
            <input
              type="password"
              placeholder=""
              class="input input-bordered"
              id="admin-key-box"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" id="register-btn">Registra</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
