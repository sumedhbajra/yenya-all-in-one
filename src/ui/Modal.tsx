import React, {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useModal } from "../hooks/useModal";
import { RxCross1 } from "react-icons/rx";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState<string>("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement;
  opens: string;
}) {
  const modalContext = useContext(ModalContext);

  if (!modalContext)
    throw new Error("Open should be used within the scope of modal provider");

  const { open } = modalContext;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const modalContext = useContext(ModalContext);

  if (!modalContext)
    throw new Error("Should be used withing the Modal Provider.");

  const { openName, close } = modalContext;

  const { ref } = useModal(close);

  if (name !== openName) return null;

  return (
    <div
      className="fixed top-0 left-0 w-[100%] h-[100vh] 
    bg-transparent backdrop-blur-sm transition-all"
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 
      -translate-y-1/2 bg-gray-100 
      rounded-lg shadow-lg px-14 py-16 transition-all"
        ref={ref}
      >
        <div className="flex justify-end">
          <button onClick={close}>
            <RxCross1 size={32} />
          </button>
        </div>
        {cloneElement(children, { close })}
      </div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;
