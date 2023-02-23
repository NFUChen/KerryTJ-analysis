import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingBackdropProps {
  isOpen: boolean;
}

export const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({ isOpen }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
