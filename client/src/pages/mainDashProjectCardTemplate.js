/**
 * @param {string} name Name of the card
 * @param {string} date Date of the card
 * @param {string} link Link where the card will redirect
 */
export default (name, date, link) => {
  return `<a
  class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-gray-800 dark:border-gray-800"
  href="${link}"
>
  <div class="p-4 md:p-5">
    <div class="flex justify-between items-center">
      <div>
        <h3
          class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200"
        >
          ${name}
        </h3>
        <p class="text-sm text-gray-500">${date}</p>
      </div>
      <div class="pl-3">
        <svg
          class="w-3.5 h-3.5 text-gray-500"
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
      </div>
    </div>
  </div>
</a>`;
};
