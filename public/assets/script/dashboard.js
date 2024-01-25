/* global bootstrap fetch */
(() => {
    'use strict'
    
    let btCrearPais = document.getElementById('btnCrearPais');
    let code = document.getElementById('code');
    let name = document.getElementById('name');
    const csrf = document.querySelector('meta[name="csrf-token"]')['content'];
    const url = document.querySelector('meta[name="url-base"]')['content'];
    
    document.addEventListener("DOMContentLoaded", function(event) {
        peticionPaises();
        btCrearPais.onclick = function() {
            let data = {
              code: code.value,
              name: name.value,
            };
            //validar en js, nos lo saltamnos
            llamadaAjax(data);
        };
    });
    
    document.getElementById('btnEditarPais').onclick = () => {
        // Llamada Ajax
        peticionEditPais();
    };
    
    document.getElementById('btnDeletePais').onclick = () => {
        // Llamada ajax
        peticionDeletePais();
    }
    
    // Codigo para poner nombre del pais
    document.getElementById(('deletePaisModal')).addEventListener('shown.bs.modal', event => {
        peticionGetPaisToDelete(event.relatedTarget.dataset);
    })
    
    function peticionDeletePais() {
        // Llamada ajax para borrar el pais
        let data = {
              code: document.getElementById('deletePaisCode'),
              name: document.getElementById('deletePaisName')
            };
        fetch(document.getElementById('deleteUrl').value, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.result > 0) {
                var modalElem = document.querySelector('#deletePaisModal');
                var modalInstance = bootstrap.Modal.getInstance(modalElem);
                modalInstance.hide();
                var okAlert = document.getElementById('deleteOkAlert');
                okAlert.className = 'alert alert-success';
                solucionAriel(data, {success: false, op: 'delete'});
            } else {
                var errorAlert = document.getElementById('deleteErrorAlert');
                errorAlert.className = 'alert alert-danger';
            }
        })
        .catch(error => {
            console.log("Error:", error);
          }
        );
    }
    
    function peticionGetPaisToDelete(dataset) {
        fetch(dataset.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(ajaxData => {
            // Seteamos los inputs para el nombre del pais
            document.getElementById('deletePaisName').textContent = ajaxData.pais.name;
            document.getElementById('deletePaisCode').value = dataset.code;
            document.getElementById('deleteUrl').value = dataset.url;
        })
        .catch(error => {
            console.log("Error:", error);
          }
        );
    }
    
    const showPaisModal = document.getElementById('showPaisModal');
    showPaisModal.addEventListener('shown.bs.modal', event => {
        document.getElementById('codePaisModal').textContent = event.relatedTarget.dataset.code;
        document.getElementById('namePaisModal').textContent = event.relatedTarget.dataset.name;
    })
    
    showPaisModal.addEventListener('hidden.bs.modal', event => {
        document.getElementById('codePaisModal').textContent = '';
        document.getElementById('namePaisModal').textContent = '';
    })
    
    // Código para rellenar formulario de edit
    const editPaisModal = document.getElementById('editPaisModal')
    editPaisModal.addEventListener('shown.bs.modal', event => {
        peticionGetPais(event.relatedTarget.dataset);
        // document.getElementById('codeEdit').value = event.relatedTarget.dataset.code;
        // document.getElementById('editUrl').value = event.relatedTarget.dataset.url;
    })
    
    editPaisModal.addEventListener('hidden.bs.modal', event => {
        document.getElementById('codeEdit').value = '';
        document.getElementById('editUrl').value = '';
        document.getElementById('nameEdit').value = '';
    })
    
    let createPaisModal = document.getElementById('createPaisModal');
    createPaisModal.addEventListener('hidden.bs.modal', event => {
        document.getElementById('code').value = '';
        document.getElementById('name').value = '';
    })
    
    let deletePaisModal = document.getElementById('deletePaisModal');
    deletePaisModal.addEventListener('hidden.bs.modal', event => {
        document.getElementById('deletePaisCode').value = '';
        document.getElementById('deleteUrl').value = '';
        document.getElementById('deletePaisName').value = '';
    })
    
    function peticionGetPais(dataset) {
        // obtiene los datos del pais a raiz de los data
        fetch(dataset.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(ajaxData => {
            // Seteamos los inputs para editar los campos
            document.getElementById('codeEdit').value = dataset.code;
            document.getElementById('editUrl').value = dataset.url;
            document.getElementById('nameEdit').value = ajaxData.pais.name;
        })
        .catch(error => {
            console.log("Error:", error);
          }
        );
    }
    
    function peticionEditPais() {
        let data = {
              code: document.getElementById('codeEdit').value,
              name:  document.getElementById('nameEdit').value,
            };
        fetch(document.getElementById('editUrl').value, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.result > 0) {
                var modalElem = document.querySelector('#editPaisModal');
                var modalInstance = bootstrap.Modal.getInstance(modalElem);
                modalInstance.hide();
                var okAlert = document.getElementById('editOkAlert');
                okAlert.className = 'alert alert-success';
                solucionAriel(data, {success: false, op: 'edit'});
            } else {
                var errorAlert = document.getElementById('editErrorAlert');
                errorAlert.className = 'alert alert-danger';
            }
        })
        .catch(error => {
            console.log("Error:", error);
          }
        );
    }

    function llamadaAjax(data) {
        fetch(url + '/pais', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.result > 0) {
                var modalElem = document.querySelector('#createPaisModal');
                var modalInstance = bootstrap.Modal.getInstance(modalElem);
                modalInstance.hide();
                var okAlert = document.getElementById('insertOkAlert');
                okAlert.className = 'alert alert-success';
                solucionAriel(data, {success: false, op: 'insert'});
            } else {
                var errorAlert = document.getElementById('errorAlert');
                errorAlert.className = 'alert alert-danger';
            }
        })
        .catch(error => {
            console.log("Error:", error);
          }
        );
    }
  
    function peticionPaises() {
        fetch(url + '/pais')
        .then(response => response.json())
        .then(data => {
            solucionAriel(data, {success: true, op: 'no-op'});
        })
        .catch(error => console.error("Error:", error));
    }

    function solucionAriel(data, operacion) {
        let contentDiv = document.getElementById("content");
        contentDiv.innerHTML = '';
        contentDiv.classList.add('table-responsive');
        contentDiv.classList.add('small');
        
        let addBtn = document.createElement("a");
        addBtn.className = "btn btn-success mt-2 mb-3";
        addBtn.setAttribute('data-bs-toggle', 'modal');
        addBtn.setAttribute('data-bs-target', '#createPaisModal');
        addBtn.innerHTML = "Add pais";
        contentDiv.appendChild(addBtn);
        
        let addBtn2 = document.createElement("a");
        addBtn2.className = "btn btn-info mt-2 mb-3 ms-2";
        addBtn2.innerHTML = "Refresh (don't do it this way, never)";
        contentDiv.appendChild(addBtn2);
        addBtn2.onclick = function() {
            peticionPaises();
        };
        
        let claseIn = 'visually-hidden';
        let claseEdit = 'visually-hidden';
        let claseDelete = 'visually-hidden';
        if (!operacion.success && operacion.op === 'insert') {
            claseIn = '';
        }
        if (!operacion.success && operacion.op === 'edit') {
            claseEdit = '';
        }
        
        if (!operacion.success && operacion.op === 'delete') {
            claseDelete = '';
        }
        
        let divSuccessInsertAlert = document.createElement('div');
        divSuccessInsertAlert.setAttribute('id', 'insertOkAlert');
        divSuccessInsertAlert.className = 'alert alert-success ' + claseIn;
        divSuccessInsertAlert.setAttribute('role', 'alert');
        divSuccessInsertAlert.innerHTML = 'País correctamente insertado!!';
        contentDiv.appendChild(divSuccessInsertAlert);
        
        let divSuccessEditAlert = document.createElement('div');
        divSuccessEditAlert.setAttribute('id', 'editOkAlert');
        divSuccessEditAlert.className = 'alert alert-success ' + claseEdit;
        divSuccessEditAlert.setAttribute('role', 'alert');
        divSuccessEditAlert.innerHTML = 'País correctamente editado!!';
        contentDiv.appendChild(divSuccessEditAlert);
        
        let divSuccessDeleteAlert = document.createElement('div');
        divSuccessDeleteAlert.setAttribute('id', 'deleteOkAlert');
        divSuccessDeleteAlert.className = 'alert alert-success ' + claseDelete;
        divSuccessDeleteAlert.setAttribute('role', 'alert');
        divSuccessDeleteAlert.innerHTML = 'País correctamente eliminado!!';
        contentDiv.appendChild(divSuccessDeleteAlert);
  
        // Creamos la tabla
        let table = document.createElement("table");
        table.classList.add('table');
        table.classList.add('table-striped');
        table.classList.add('table-sm');
        
        // Creamos la cabecera de la tabla
        let head = document.createElement("thead");
        let thtr = document.createElement("tr");
        
        let tcode = document.createElement("th");
        tcode.setAttribute("scope", "col");
        tcode.innerHTML = 'Code';
        thtr.appendChild(tcode);
        
        let tname = document.createElement("th");
        tname.setAttribute("scope", "col");
        tname.innerHTML = 'Name';
        thtr.appendChild(tname);
        
        let tactions = document.createElement("th");
        tactions.setAttribute("scope", "col");
        tactions.innerHTML = "Actions";
        thtr.appendChild(tactions);
        
        // Añadimos la fila a la cabecera
        head.appendChild(thtr);
        
        // Añadimos la cabecera a la tabla
        table.appendChild(head);
        
        // Creamos el cuerpo de la tabla
        let body = document.createElement("tbody");
        
        // Hacemos bucle para recorrer data
        for(const pais of data.paises) {
            let row = document.createElement('tr');
            let code = document.createElement('td');
            let name = document.createElement('td');
            let actions = document.createElement('td');
            
            code.innerHTML = pais.code;
            name.innerHTML = pais.name;
            
            let showBtn = document.createElement('a');
            let editBtn = document.createElement('a');
            let deleteBtn = document.createElement('a');
            
            showBtn.classList.add('btn');
            showBtn.classList.add('btn-primary');
            showBtn.style.marginRight = '1rem';
            showBtn.setAttribute('data-code', pais.code);
            showBtn.setAttribute('data-name', pais.name);
            showBtn.setAttribute('data-bs-toggle', 'modal');
            showBtn.setAttribute('data-bs-target', '#showPaisModal');
    
            editBtn.classList.add('btn');
            editBtn.classList.add('btn-warning');
            editBtn.style.marginRight = '1rem';
            editBtn.setAttribute('data-bs-toggle', 'modal');
            editBtn.setAttribute('data-bs-target', '#editPaisModal');
            editBtn.setAttribute('data-code', pais.code);
            editBtn.setAttribute('data-url', url + `/pais/${pais.code}`);
            
            deleteBtn.classList.add('btn');
            deleteBtn.classList.add('btn-danger');
            deleteBtn.setAttribute('data-bs-toggle', 'modal');
            deleteBtn.setAttribute('data-bs-target', '#deletePaisModal');
            deleteBtn.setAttribute('data-code', pais.code);
            deleteBtn.setAttribute('data-url', url + `/pais/${pais.code}`);
            
            showBtn.innerHTML = 'View';
            editBtn.innerHTML = 'Edit';
            deleteBtn.innerHTML = 'Delete';
            
            actions.appendChild(showBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            
            row.appendChild(code);
            row.appendChild(name);
            row.appendChild(actions);
            body.appendChild(row);
        }
        table.appendChild(body);
        contentDiv.appendChild(table);
    }

})()