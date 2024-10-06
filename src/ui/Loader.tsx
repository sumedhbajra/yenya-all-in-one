import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader w-28 h-28 relative col-start-2 col-span-2 place-self-center">
      <div className="box1"></div>
      <div className="box2"></div>
      <div className="box3"></div>

      <style jsx>{`
        .box1,
        .box2,
        .box3 {
          border: 10px solid orange;
          box-sizing: border-box;
          position: absolute;
          display: block;
        }

        .box1 {
          width: 112px;
          height: 48px;
          margin-top: 64px;
          margin-left: 0px;
          animation: abox1 4s 1s forwards ease-in-out infinite;
        }

        .box2 {
          width: 48px;
          height: 48px;
          margin-top: 0px;
          margin-left: 0px;
          animation: abox2 4s 1s forwards ease-in-out infinite;
        }

        .box3 {
          width: 48px;
          height: 48px;
          margin-top: 0px;
          margin-left: 64px;
          animation: abox3 4s 1s forwards ease-in-out infinite;
        }

        @keyframes abox1 {
          0% {
            width: 112px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }

          12.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }

          25% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }

          37.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }

          50% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }

          62.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }

          75% {
            width: 48px;
            height: 112px;
            margin-top: 0px;
            margin-left: 0px;
          }

          87.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }

          100% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }
        }

        @keyframes abox2 {
          0% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }

          12.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }

          25% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }

          37.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }

          50% {
            width: 112px;
            height: 48px;
            margin-top: 0px;
            margin-left: 0px;
          }

          62.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }

          75% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }

          87.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }

          100% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }
        }

        @keyframes abox3 {
          0% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }

          12.5% {
            width: 48px;
            height: 48px;
            margin-top: 0px;
            margin-left: 64px;
          }

          25% {
            width: 48px;
            height: 112px;
            margin-top: 0px;
            margin-left: 64px;
          }

          37.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }

          50% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }

          62.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }

          75% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }

          87.5% {
            width: 48px;
            height: 48px;
            margin-top: 64px;
            margin-left: 64px;
          }

          100% {
            width: 112px;
            height: 48px;
            margin-top: 64px;
            margin-left: 0px;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
