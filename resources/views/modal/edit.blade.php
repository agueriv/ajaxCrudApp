<div class="modal" id="editPaisModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Editar Pais</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger visually-hidden" role="alert" id="editErrorAlert">
                    Error al editar el país...
                </div>
                <div class="mb-3">
                    <label for="code" class="form-label">Codigo del pais</label>
                    <input type="text" class="form-control" maxlength="3" id="codeEdit" placeholder="Escribe el codigo del pais">
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre del pais</label>
                    <input type="text" class="form-control" maxlength="100" id="nameEdit" placeholder="Escribe el nombre del pais">
                </div>
                <input type="hidden" class="form-control" name="url" id="editUrl" value="">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" id="btnEditarPais" class="btn btn-success">Editar Pais</button>
            </div>
        </div>
    </div>
</div>