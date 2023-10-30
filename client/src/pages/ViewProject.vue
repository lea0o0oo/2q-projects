<template>
  <div class="w-full mb-10">
    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4"
      style="width: 99.5%"
    >
      <div class="bg-neutral w-full rounded-lg lg:ml-2">
        <div class="ml-2 mr-2 mt-3">
          <div class="flex ml-2">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/330/430/small/2_-_1_-_Pencil.jpg"
              id="project-icon"
              class="mask mask-squircle"
              style="height: 60px"
            />
            <h3 class="font-extrabold text-3xl ml-4" style="margin-top: 12px">
              Semaforo
            </h3>
          </div>
          <div class="divider"></div>

          <pre
            class="mt-5 ml-2"
            style="white-space: pre-wrap; overflow-y: auto; max-height: 30vh"
          >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Interdum velit euismod in pellentesque massa placerat. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Convallis convallis tellus id interdum velit laoreet id. Habitant morbi tristique senectus et netus et malesuada fames ac. Urna nunc id cursus metus aliquam eleifend mi. Odio euismod lacinia at quis risus sed. Duis at consectetur lorem donec massa sapien faucibus et. Suspendisse in est ante in nibh. Tortor aliquam nulla facilisi cras. Sit amet massa vitae tortor. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Fermentum leo vel orci porta non. Integer feugiat scelerisque varius morbi enim nunc. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Sollicitudin nibh sit amet commodo nulla facilisi. Diam sollicitudin tempor id eu.</pre
          >

          <h4 class="font-bold text-xl mt-10">Data</h4>
          11 Gennaio 1967
          <div id="links-div" class="mb-3">
            <h2 class="font-bold text-3xl mt-5">Link</h2>
            <button class="btn">
              Link del progetto
              <svg
                fill="currentColor"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18,10.82a1,1,0,0,0-1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8A1,1,0,0,1,5,7h7.18a1,1,0,0,0,0-2H5A3,3,0,0,0,2,8V19a3,3,0,0,0,3,3H16a3,3,0,0,0,3-3V11.82A1,1,0,0,0,18,10.82Zm3.92-8.2a1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H15a1,1,0,0,0,0,2h3.59L8.29,14.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L20,5.41V9a1,1,0,0,0,2,0V3A1,1,0,0,0,21.92,2.62Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="bg-neutral w-full rounded-lg lg:col-span-3 h-full flex align-middle"
      >
        <div>
          <div
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 ml-2 mt-3"
          >
            <div class="w-full flex justify-center">
              <img
                src="https://i1.wp.com/potafiori.com/wp-content/uploads/2020/04/placeholder.png"
                style="width: 100%; height: auto; object-fit: cover"
                class="rounded-xl cursor-pointer"
                id="project-image"
                onclick="modal_see_img.showModal()"
              />
            </div>
            <div style="height: 700px" class="rounded-lg">
              <iframe
              src=https://create.arduino.cc/editor/lea0o0oo/714c965a-ce4d-421e-8f66-2fb37af07120/preview?embed
              class="w-full h-full" />
            </div>
          </div>
          <div id="htmlDIV" class="w-full h-full mb-3"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Open the modal using ID.showModal() method -->
  <dialog id="modal_see_img" class="modal">
    <div class="modal-box" style="min-width: 50%">
      <h3 class="font-bold text-lg mb-2">Anteprima</h3>
      <img
        src="https://i1.wp.com/potafiori.com/wp-content/uploads/2020/04/placeholder.png"
        style="width: 100%; height: auto"
        class="rounded-xl"
        id="image-fullscreen"
      />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
