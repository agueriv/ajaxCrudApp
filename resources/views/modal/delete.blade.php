<div class="modal" id="deletePaisModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Eliminar Pais</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger visually-hidden" role="alert" id="deleteErrorAlert">
                    Error al eliminar el país...
                </div>
                <p class="title">Estas seguro de que quieres eliminar el Pais <span id="deletePaisName"></span>?</p>
                <input type="hidden" id="deleteUrl" name="deleteUrl"/>
                <input type="hidden" id="deletePaisCode" name="deletePaisCode"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" id="btnDeletePais" class="btn btn-success">Eliminar Pais</button>
            </div>
        </div>
    </div>
</div>