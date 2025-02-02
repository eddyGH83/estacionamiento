<template>
    <br />
    <h1>Empleados</h1>
    <div class="contenido">
      <div class="card">
        <div class="card-body text-end">
          <form class="row g-3" @submit.prevent>
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar Empleado"
                v-model="filtro"
              />
            </div>
            <div class="col-auto">
              <button
                type="submit"
                class="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                + Agregar Empleado
              </button>
            </div>
          </form>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDOS</th>
              <th scope="col">ÁREA</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(empleado, index) in filteredEmpleados" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ empleado.nombre }}</td>
              <td>{{ empleado.apellidos }}</td>
              <td>{{ empleado.area }}</td>
              <td>
                <button
                  type="submit"
                  class="btn btn-primary mb-3"
                  @click="editarEmpleado(empleado)"
                >
                  Editar
                </button>
  
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="eliminarEmpleado(empleado)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Empleado</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Nombres</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Nombre del empleado"
                v-model="empleado.nombre"
              />
            </div>
  
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Apellidos</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Apellidos del empleado"
                v-model="empleado.apellidos"
              />
            </div>
  
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Área</label>
              <select
                class="form-control"
                v-model="empleado.area"
              >
                <option value="producción">Producción</option>
                <option value="finanzas">Finanzas</option>
                <option value="contabilidad">Contabilidad</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="guardarEmpleado()"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- modal eliminar -->
    <div
      class="modal fade"
      id="eliminar"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="eliminarLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="eliminarLabel">Eliminar Empleado</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">¿Estás seguro de eliminar el empleado?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="guardarEmpleadoEliminado()">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- modal editar -->
    <div
      class="modal fade"
      id="editar"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="editarLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editarLabel">Editar Empleado</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Nombres</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Nombre del empleado"
                v-model="nuevoEmpleado.nombre"
              />
            </div>
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Apellidos</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Apellidos del empleado"
                v-model="nuevoEmpleado.apellidos"
              />
            </div>
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Área</label>
              <select
                class="form-control"
                v-model="nuevoEmpleado.area"
              >
                <option value="producción">Producción</option>
                <option value="finanzas">Finanzas</option>
                <option value="contabilidad">Contabilidad</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="guardarEmpleadoEditado()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
  import axios from "axios";
  import { Modal } from "bootstrap";
  export default {
    data() {
      return {
        filtro: "",
        empleados: [],
        empleado: {
          id: "",
          nombre: "",
          apellidos: "",
          area: "",
        },
        nuevoEmpleado: {
          id: "",
          nombre: "",
          apellidos: "",
          area: "",
        },
        idEliminar: 0,
      };
    },
    mounted() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/empleados`)
        .then((response) => {
          this.empleados = response.data;
          console.table(this.empleados);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
    },
    computed: {
      filteredEmpleados() {
        return this.empleados.filter((empleado) => {
          return (
            empleado.nombre &&
            empleado.nombre.toLowerCase().includes(this.filtro.toLowerCase())
          );
        });
      },
    },
    methods: {
      // guardar empleado por axios, json-server
      guardarEmpleado() {
        // el id debe incrementar +1 (se puede tomar como referencia el tamaño del array)
        this.empleado.id = this.empleados.length + 1;
  
        axios
          .post(`${process.env.VUE_APP_API_URL}/empleados`, this.empleado)
          .then((response) => {
            console.log(response);
            this.empleados.push(this.empleado);
            this.empleado = {
              id: 0,
              nombre: "",
              apellidos: "",
              area: "",
            };
          })
          .catch((error) => {
            console.error("Error saving employee:", error);
          });
      },
      // eliminar empleado por axios, json-server
      eliminarEmpleado(empleado) {
        // abrir el modal eliminar
        this.idEliminar = empleado.id;
  
        const modalElement = document.getElementById("eliminar");
        const modalInstance =
          Modal.getInstance(modalElement) || new Modal(modalElement);
        modalInstance.show();
      },
  
      // guardar empleado eliminado por axios, json-server
      guardarEmpleadoEliminado() {
        axios
          .delete(`${process.env.VUE_APP_API_URL}/empleados/${this.idEliminar}`)
          .then((response) => {
            console.log(response);
            this.empleados = this.empleados.filter((e) => e.id !== this.idEliminar);
            // cerrar el modal eliminar
            const modalElement = document.getElementById("eliminar");
            const modalInstance =
              Modal.getInstance(modalElement) || new Modal(modalElement);
            modalInstance.hide();
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
          });
      },
  
      // editar empleado por axios, json-server
      editarEmpleado(empleado) {
        this.nuevoEmpleado = empleado;
        // abrir el modal editar
        const modalElement = document.getElementById("editar");
        const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
        modalInstance.show();
      },
  
      // guardar empleado editado por axios, json-server
      guardarEmpleadoEditado() {
        axios
          .put(
            `${process.env.VUE_APP_API_URL}/empleados/${this.nuevoEmpleado.id}`,
            this.nuevoEmpleado
          )
          .then((response) => {
            console.log(response);
            this.empleados = this.empleados.map((e) => {
              if (e.id === this.nuevoEmpleado.id) {
                return this.nuevoEmpleado;
              }
              return e;
            });
            this.nuevoEmpleado = {
              id: "",
              nombre: "",
              apellidos: "",
              area: "",
            };
            // cerrar el modal editar
            const modalElement = document.getElementById("editar");
            const modalInstance =
              Modal.getInstance(modalElement) || new Modal(modalElement);
            modalInstance.hide();
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
          });
      },
    },
  
    name: "Empleados",
    props: {
      msg: String,
    },
  };
  </script>
  
  <style scoped>
  .contenido {
    /* aplicar padding por todo lado */
    padding: 20px 20px 20px 20px;
  }
  </style>