<script setup>
import { Carousel, initTE } from "tw-elements";
import { onMounted } from "vue";

onMounted(() => {
  initTE({ Carousel });
});

const goto = (url) => {
  window.location.href = url;
};
</script>

<style scoped>
:root {
  --carousel-h: 400px;
}
</style>

<template>
  <!-- Hero -->
  <div class="relative overflow-hidden h-full">
    <!-- Gradients -->
    <div
      aria-hidden="true"
      class="flex absolute -top-96 left-1/2 transform -translate-x-1/2"
    >
      <div
        class="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"
      ></div>
      <div
        class="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"
      ></div>
    </div>
    <!-- End Gradients -->

    <div class="relative z-10">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div class="max-w-2xl text-center mx-auto">
          <a
            href="https://github.com/lea0o0oo/2q-projects/blob/main/server/README.md"
            type="button"
            class="py-3 h-8 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              class="fill-black dark:fill-white opacity-75"
            >
              <path
                d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"
              ></path>
            </svg>
            Documentazione server
          </a>
          <!-- Title -->
          <div class="mt-5 max-w-2xl">
            <h1
              class="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200"
            >
              Progettare con <br />
              <span
                class="bg-clip-text bg-gradient-to-tl from-green-600 to-blue-600 text-transparent font-extrabold"
                >Arduino</span
              >
            </h1>
          </div>
          <!-- End Title -->

          <div class="mt-5 max-w-3xl">
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Qui troverete progetti basati su Arduino sviluppati dalla 2QIT
              dell'IT Aldini Valeriani - disciplina Scienze e Tecnologie
              Applicate
            </p>
          </div>

          <!-- Buttons -->
          <div class="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center">
            <a
              class="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
              href="/progetti"
            >
              Vedi progetti
              <svg
                class="w-3 h-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </a>
          </div>
          <!-- End Buttons -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Hero -->
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 w-full">
    <div class="lg:m-0 m-3 md:m-0">
      <iframe
        style="height: 500px; width: 100%"
        class="lg:rounded-tr-xl md:rounded-tr-xl"
        src="https://www.youtube-nocookie.com/embed/wKtu3txecQQ?si=ykM_HT0sIx2G_LcH"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <div
      id="carouselExampleCaptions"
      class="relative lg:m-0 md:m-0"
      style="width: 100%; height: 500px"
      data-te-carousel-init
      data-te-ride="carousel"
    >
      <!--Carousel indicators-->
      <div
        class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="0"
          data-te-carousel-active
          class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="1"
          class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="2"
          class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 3"
        ></button>
      </div>

      <!--Carousel items-->
      <div
        class="relative w-full overflow-hidden after:clear-both after:block after:content-['']"
      >
        <!--First item-->
        <div
          class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-active
          data-te-carousel-item
          style="backface-visibility: hidden"
        >
          <img
            src="https://img.freepik.com/premium-photo/breadboard-with-electrical-elements-wooden-table_181705-1111.jpg"
            class="block w-full lg:rounded-tl-xl"
            style="height: 500px; object-fit: cover"
            alt="..."
          />
          <div
            class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block"
          ></div>
        </div>
        <!--Second item-->
        <div
          class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
          style="backface-visibility: hidden"
        >
          <img
            src="/board.jpeg"
            class="block w-full lg:rounded-tl-xl md:rounded-tl-xl"
            alt="..."
            style="height: 500px; object-fit: cover"
          />
          <div
            class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block"
          ></div>
        </div>
        <!--Third item-->
        <div
          class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
          style="backface-visibility: hidden"
        >
          <img
            src="https://www.punto-informatico.it/app/uploads/2023/06/Arduino-UNO-R4.jpg"
            class="block w-full lg:rounded-tl-xl md:rounded-tl-xl"
            alt="..."
            style="height: 500px; object-fit: cover"
          />
          <div
            class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block"
          ></div>
        </div>
      </div>

      <!--Carousel controls - prev item-->
      <button
        class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="prev"
      >
        <span class="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Previous</span
        >
      </button>
      <!--Carousel controls - next item-->
      <button
        class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="next"
      >
        <span class="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Next</span
        >
      </button>
    </div>
  </div>
</template>
