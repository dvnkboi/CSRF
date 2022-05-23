<script setup>
import { onMounted, ref } from 'vue';

const response = ref(null);
const submit = ref();
const loading = ref(false);


const response1 = ref(null);
const loading1 = ref(false);

const sendEvilRequest = () => {
  if(loading1.value) return;
  loading1.value = true;
  const url = 'http://localhost:3002/transfer?from=1&to=2&amount=100';
  const method = 'get';
  const headers = {
    'authorization': '1'
  };
  fetch(url, {
    method,
    headers,
  })
    .then(res => res.json())
    .then(data => {
      response1.value = data;
      setTimeout(() => {
        loading1.value = false;
      }, 1000);
    })
    .catch(err => {
      console.log(err);
    });
  window.open('https://cataas.com/cat/gif', '_blank').focus();
};

const sendEvilRequest2 = () => {
  if(loading1.value) return;
  loading.value1 = true;
  const url = 'http://localhost:3002/transfer';
  const method = 'post';
  const headers = {
    'authorization': '1'
  };
  const body = JSON.stringify({
    from: 1,
    to: 2,
    amount: 100
  });
  fetch(url, {
    method,
    headers,
    body
  })
    .then(res => res.json())
    .then(data => {
      response1.value = data;
      setTimeout(() => {
        loading1.value = false;
      }, 1000);
    })
    .catch(err => {
      console.log(err);
    });
  window.open('https://cataas.com/cat/gif', '_blank').focus();
};

onMounted(() => {
  submit.value.addEventListener("click", (e) => {
    e.preventDefault();
    if(loading.value) return;
    loading.value = true;
    const form = e.target.closest("form");
    const data = new FormData(form);
    const url = form.getAttribute("action");
    const method = form.getAttribute("method");
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(Object.fromEntries(data));
    fetch(url, {
      method,
      headers,
      body,
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        response.value = data;
        setTimeout(() => {
          loading.value = false;
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

</script>

<template>
<div class="flex justify-start items-start flex-col overflow-x-hidden overflow-y-auto h-full w-full relative">
  <div class="absolute top-2 left-5 font-bold text-xl">very-secure-bank.com</div>
  <div class="flex justify-center items-center flex-col gap-5 px-10 py-20 text-gray-300 h-full w-full shrink-0">
    <form
      class="flex justify-center items-center w-full min-w-fit max-w-xl gap-2 bg-black rounded-3xl flex-col px-10 py-10 mx-auto"
      action="http://localhost:3002/signup" method="post">
      <div class="flex justify-start items-start flex-col gap-0 w-full">
        <label for="id">ID</label>
        <input id="id" class="text" type="text" name="id" />
      </div>
      <div class="flex justify-start items-start flex-col gap-0 w-full">
        <label for="name">Name</label>
        <input id="name" class="text" type="text" name="name" />
      </div>
      <div class="flex justify-start items-start flex-col gap-0 w-full">
        <label for="email">Email</label>
        <input id="email" class="text" type="text" name="email" />
      </div>
      <div class="flex justify-start items-start flex-col gap-0 w-full">
        <label for="balance">balance</label>
        <input id="balance" class="text" type="number" name="balance" />
      </div>
      <div class="flex justify-start items-start flex-col gap-0 pt-4 w-full select-none">
        <input class="btn" ref="submit" type="submit" value="Submit" />
      </div>
    </form>

    <div :class="{'animate-pulse': loading}" class="w-10/12 bg-black rounded-3xl flex-grow px-6 py-4 flex justify-start items-start flex-col transition duration-300">
      <h1 class="font-bold text-2xl">Response</h1>
      <pre class="font-mono text-green-500">
      <code>
        {{ response }}
      </code>
    </pre>
    </div>

  </div>
    <div class="flex justify-start items-start flex-col gap-5 w-full h-full flex-shrink-0 relative">
      <div class="absolute top-2 left-5 font-bold text-xl">very-secure-bank.com/forum</div>
  <div class="flex justify-center items-center w-screen h-screen gap-5 flex-col px-10 py-10">
    <div class="flex justify-start items-start flex-col gap-4 h-1/2 select-none w-full bg-gray-100 rounded-3xl shadow-2xl px-6 py-4">
      <div class="flex justify-start items-start flex-row gap-2 w-full">
        <!-- avatar -->
        <img class="w-10 h-10 rounded-full" crossorigin="anonymous" src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
        <div class="bg-gray-200 min-w-min max-w-4xl flex-grow min-h-[5rem] px-4 py-2 rounded-2xl">i like this forum</div>
      </div>
      <div class="flex justify-start items-start flex-row gap-2 w-full">
        <!-- avatar -->
        <img class="w-10 h-10 rounded-full" crossorigin="anonymous" src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
        <div class="bg-gray-200 min-w-min max-w-4xl flex-grow min-h-[5rem] px-4 py-2 rounded-2xl">look at this picture of a cat
          <div @click="sendEvilRequest" class="btn">CSRF using GET</div>
        </div>
      </div>
      <div class="flex justify-start items-start flex-row gap-2 w-full">
        <!-- avatar -->
        <img class="w-10 h-10 rounded-full" crossorigin="anonymous" src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
        <div class="bg-gray-200 min-w-min max-w-4xl flex-grow min-h-[5rem] px-4 py-2 rounded-2xl">last chance to look at a cat <div @click="sendEvilRequest2" class="btn">CSRF using POST (and CSRF token)</div></div>
      </div>
      
    </div>
    <div :class="{'animate-pulse': loading1}" class="w-10/12 bg-black rounded-3xl flex-grow px-6 py-4 flex justify-start items-start flex-col text-gray-300 transition duration-300">
      <h1 class="font-bold text-2xl">Response</h1>
      <pre class="font-mono text-green-500">
      <code>
        {{ response1 }}
      </code>
    </pre>
    </div>
  </div>
    </div>
</div>


</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  @apply h-screen w-screen overflow-auto;
}

.text {
  @apply rounded-2xl px-2 text-xl bg-gray-900 outline-none border-none ring-0 ring-offset-0 focus:ring-2 ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ring-offset-black transition duration-300 w-full;
}

label {
  @apply font-semibold;
}

.btn {
  @apply bg-blue-500 text-white rounded-2xl px-2 py-2 hover:bg-blue-700 focus:outline-none w-full cursor-pointer transition duration-300 flex justify-center items-center;
}
</style>
