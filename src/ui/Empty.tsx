import React from "react";

const TerminalCard: React.FC = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-xl bg-gray-200 backdrop-blur-sm min-w-[344px] col-start-2 col-span-2 w-20 place-self-center">
      <div className="flex flex-col gap-4 relative z-10 border border-gray-600 rounded-lg overflow-hidden">
        <div className="flex flex-col">
          <div className="flex items-center justify-between overflow-hidden min-h-[40px] px-3 bg-gray-800 rounded-t-lg">
            <p className="flex items-center gap-2 h-10 font-semibold text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
              <svg
                width="16px"
                height="16px"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                className="text-blue-600"
              >
                <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
              </svg>
              Error !
            </p>

            <button className="flex items-center justify-center p-1 border border-gray-400 rounded-md bg-gray-800 text-gray-400 cursor-pointer">
              <svg
                width="16px"
                height="16px"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
              >
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col relative rounded-b-lg bg-black overflow-x-auto p-4 text-white whitespace-nowrap">
            <pre className="flex flex-row items-center">
              <code className="text-gray-600"> -&nbsp;</code>
              <code className="text-pink-600">Movie&nbsp;</code>
              <code className="cmd relative" data-cmd="create-react-app@latest">
                not found
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalCard;
