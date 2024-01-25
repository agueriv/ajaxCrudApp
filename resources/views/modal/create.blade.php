<div class="modal" id="createPaisModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Crear nuevo Pais</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger visually-hidden" role="alert" id="errorAlert">
                    Error al crear el país...
                </div>
                <div class="mb-3">
                    <label for="code" class="form-label">Codigo del pais</label>
                    <input type="text" class="form-control" maxlength="3" id="code" placeholder="Escribe el codigo del pais">
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre del pais</label>
                    <input type="text" class="form-control" maxlength="100" id="name" placeholder="Escribe el nombre del pais">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" id="btnCrearPais" class="btn btn-success">Crear Pais</button>
            </div>
        </div>
    </div>
</div>