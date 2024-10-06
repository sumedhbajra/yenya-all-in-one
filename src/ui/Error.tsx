import React from "react";

export default function Error() {
  return (
    <div className=" p-4 rounded-lg col-span-2 w-96 col-start-2 place-self-center">
      <div className="loader">
        <p>start exploring</p>
        <div className="words">
          <div className="absolute inset-0 bg-[rgba(33,33,33,0)] from-[#212121] to-transparent via-transparent"></div>
          <span className="word">movies</span>
          <span className="word">stars</span>
          <span className="word">actors</span>
          <span className="word">country</span>
          <span className="word">life</span>

          <style jsx>{`
            .card {
              /* color used to softly clip top and bottom of the .words container */
              --bg-color: #212121;
              background-color: var(--bg-color);
              padding: 1rem 2rem;
              border-radius: 1.25rem;
            }
            .loader {
              color: rgb(124, 124, 124);
              font-family: "Poppins", sans-serif;
              font-weight: 500;
              font-size: 20px;
              -webkit-box-sizing: content-box;
              box-sizing: content-box;
              height: 40px;

              padding: 10px 10px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              border-radius: 8px;
            }

            .words {
              overflow: hidden;
              position: relative;
            }
            .words::after {
              content: "";
              position: absolute;
              inset: 0;
              /* background: linear-gradient(
                var(--bg-color) 10%,
                transparent 30%,
                transparent 70%,
                var(--bg-color) 90%
              ); */
              z-index: 20;
            }

            .word {
              display: block;
              height: 100%;
              padding-left: 6px;
              color: orange;
              animation: spin_4991 4s infinite;
            }

            @keyframes spin_4991 {
              10% {
                -webkit-transform: translateY(-102%);
                transform: translateY(-102%);
              }

              25% {
                -webkit-transform: translateY(-100%);
                transform: translateY(-100%);
              }

              35% {
                -webkit-transform: translateY(-202%);
                transform: translateY(-202%);
              }

              50% {
                -webkit-transform: translateY(-200%);
                transform: translateY(-200%);
              }

              60% {
                -webkit-transform: translateY(-302%);
                transform: translateY(-302%);
              }

              75% {
                -webkit-transform: translateY(-300%);
                transform: translateY(-300%);
              }

              85% {
                -webkit-transform: translateY(-402%);
                transform: translateY(-402%);
              }

              100% {
                -webkit-transform: translateY(-400%);
                transform: translateY(-400%);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
