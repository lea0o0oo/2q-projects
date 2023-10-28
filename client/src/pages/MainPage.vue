<script setup></script>

<template>
  <div
    class="hero"
    style="
      background-image: url(https://i.pinimg.com/736x/f9/dd/b4/f9ddb48c4d9010e8333a319d0213ca35.jpg);
      height: 20vh;
    "
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-6xl font-bold w-full text-white">
          Progettare con arduino
        </h1>
      </div>
    </div>
  </div>
  <!-- Features -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="aspect-w-16 aspect-h-7">
      <div class="carousel w-full" style="height: 400px">
        <div id="slide1" class="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/premium-photo/breadboard-with-electrical-elements-wooden-table_181705-1111.jpg"
            class="w-full"
            style="object-fit: cover"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
          >
            <a href="#slide4" class="btn btn-circle">❮</a>
            <a href="#slide2" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" class="carousel-item relative w-full">
          <img
            src="https://www.digikey.com/-/media/MakerIO/Images/blogs/2022/Getting%20Started%20with%20Tinkercad%20Circuits/Getting-Started-with-Tinkercad-Circuits.jpg"
            class="w-full"
            style="object-fit: cover"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
          >
            <a href="#slide1" class="btn btn-circle">❮</a>
            <a href="#slide3" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" class="carousel-item relative w-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zEeDqsYO2J-iDAjG-4bLrj5XE361BhIB8g&usqp=CAUdata:image/jpeg;base64,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"
            class="w-full"
            style="object-fit: cover"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
          >
            <a href="#slide2" class="btn btn-circle">❮</a>
            <a href="#slide4" class="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
      <div class="lg:col-span-1">
        <h2
          class="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200"
        >
          Benvenuti nel nostro sito Web
        </h2>
        <p class="mt-2 md:mt-4 text-gray-500">
          Qui troverete progetti basati su Arduino sviluppati dalla 2QIT dell'IT
          Aldini Valeriani - disciplina Scienze e Tecnologie Applicate
        </p>
      </div>
      <!-- End Col -->

      <div class="lg:col-span-2">
        <div class="grid sm:grid-cols-2 gap-8 md:gap-12">
          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"
              />
              <path
                d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"
              />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Creative minds
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                We choose our teams carefully. Our people are the secret to
                great work.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->

          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
              />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Simple and affordable
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                From boarding passes to movie tickets, there's pretty much
                nothing you can't store with Preline.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->

          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
              />
              <path
                d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
              />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Industry-leading documentation
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                Our documentation and extensive Client libraries contain
                everything a business needs to build a custom integration.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->

          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z"
              />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Designing for people
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                We actively pursue the right balance between functionality and
                aesthetics, creating delightful experiences.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->
        </div>
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Features -->
</template>
