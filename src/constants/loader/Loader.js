import React from "react";
import { Box, Modal } from "@mui/material";
const Loader = (props) => {
  const style = {
    outline: "none",
  };
  return (
    <Box>
      {props.isLoad ? (
        <Modal open>
          <Box className="loader_loading" sx={style}>
            <figure>
              <img src="/static/images/loading.gif" alt="" />
            </figure>
          </Box>
        </Modal>
      ) : (
        ""
      )}
    </Box>
  );
};
export default Loader;