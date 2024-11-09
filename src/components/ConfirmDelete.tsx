import "../css/modal.css";

const ConfirmDelete = ({
  open,
  setOpen,
  onConfirm,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onConfirm: () => void;
}) => {
  return (
    <div className={`modalBG ${open ? "open" : ""}`}>
      <div>
        <p>Are you sure you want to delete the product?</p>
        <div>
          <button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
