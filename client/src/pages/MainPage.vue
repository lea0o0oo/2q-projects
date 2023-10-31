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
  <div class="relative overflow-hidden">
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
