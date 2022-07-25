import React from "react"
import PropTypes from "prop-types"
import { Modal, ModalBody } from "reactstrap"
import "../chat/style/case-grid.scss"

const DynamicModel = ({
  size = "lg",
  open,
  toggle,
  modalTitle,
  modalSubtitle,
  children,
}) => {
  return (
    <Modal
      isOpen={open}
      toggle={toggle}
      centered={true}
      size={size}
      backdrop={"static"}
    >
      <ModalBody className="py-3 px-5" style={{ backgroundColor: "#fdfdfd" }}>
        <div className="mt-3">
          <h6 className="fw-medium" style={{ display: "block" }}>
            {modalTitle}
          </h6>
          <span className="text-muted"> {modalSubtitle}</span>
        </div>
        <>{children}</>
        <div className="d-flex justify-content-end my-2">
          <button className="btn btn-primary" onClick={() => toggle()}>
            DONE
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

DynamicModel.propTypes = {
  size: PropTypes.string,
  modalSubtitle: PropTypes.string,
  modalTitle: PropTypes.string,
  children: PropTypes.any,
  open: PropTypes.bool,
  toggle: PropTypes.func,
}

export default DynamicModel
