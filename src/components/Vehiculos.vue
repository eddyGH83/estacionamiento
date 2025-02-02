<template>
    <br />
    <h1>Vehículos</h1>
    <div class="contenido">
      <div class="card">
        <div class="card-body text-end">
          <form class="row g-3" @submit.prevent>
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar Vehículo por Placa"
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
                + Agregar Vehículo
              </button>
            </div>
          </form>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">TIPO</th>
              <th scope="col">PLACA</th>
              <th scope="col">COLOR</th>
              <th scope="col">EMPLEADO</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vehiculo, index) in filteredVehiculos" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ vehiculo.tipo }}</td>
              <td>{{ vehiculo.placa }}</td>
              <td>{{ vehiculo.color }}</td>
              <td>{{ vehiculo.empleado.nombre }} {{ vehiculo.empleado.apellidos }}</td>
              <td>
                <button
                  type="submit"
                  class="btn btn-primary mb-3"
                  @click="editarVehiculo(vehiculo)"
                >
                  Editar
                </button>
  
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="eliminarVehiculo(vehiculo)"
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
            <h5 class="modal-title" id="staticBackdropLabel">Vehículo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Tipo</label>
              <select
                class="form-control"
                v-model="vehiculo.tipo"
              >
                <option value="auto" selected>Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Placa</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Número de placa"
                v-model="vehiculo.placa"
              />
            </div>
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Color</label>
              <select
                class="form-control"
                v-model="vehiculo.color"
              >
                <option value="rojo">Rojo</option>
                <option value="verde">Verde</option>
                <option value="azul">Azul</option>
                <option value="azul">Negro</option>
                <option value="azul">Blanco</option>
              </select>
            </div>
  
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Empleado</label>
              <select
                class="form-control"
                v-model="vehiculo.empleadoId"
              >
                <option v-for="empleado in empleados" :key="empleado.id" :value="empleado.id">
                  {{ empleado.nombre }} {{ empleado.apellidos }}
                </option>
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
              @click="guardarVehiculo()"
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
            <h5 class="modal-title" id="eliminarLabel">Eliminar Vehículo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">¿Estás seguro de eliminar el vehículo?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="guardarVehiculoEliminado()">Eliminar</button>
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
            <h5 class="modal-title" id="editarLabel">Editar Vehículo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Tipo</label>
              <select
                class="form-control"
                v-model="nuevoVehiculo.tipo"
              >
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Placa</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Número de placa"
                v-model="nuevoVehiculo.placa"
              />
            </div>
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Color</label>
              <select
                class="form-control"
                v-model="nuevoVehiculo.color"
              >
                <option value="rojo">Rojo</option>
                <option value="verde">Verde</option>
                <option value="azul">Azul</option>
              </select>
            </div>
            <div class="mb-3" style="text-align: left;">
              <label class="form-label">Empleado</label>
              <select
                class="form-control"
                v-model="nuevoVehiculo.empleadoId"
              >
                <option v-for="empleado in empleados" :key="empleado.id" :value="empleado.id">
                  {{ empleado.nombre }} {{ empleado.apellidos }}
                </option>
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
            <button type="button" class="btn btn-primary" @click="guardarVehiculoEditado()">Guardar</button>
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
        vehiculos: [],
        empleados: [],
        vehiculo: {
          id: "",
          tipo: "",
          placa: "",
          color: "",
          empleadoId: "",
        },
        nuevoVehiculo: {
          id: "",
          tipo: "",
          placa: "",
          color: "",
          empleadoId: "",
        },
        idEliminar: 0,
      };
    },
    mounted() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/vehiculos`)
        .then((response) => {
          this.vehiculos = response.data;
          console.table(this.vehiculos);
        })
        .catch((error) => {
          console.error("Error fetching vehicles:", error);
        });
  
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
      filteredVehiculos() {
        return this.vehiculos.filter((vehiculo) => {
          return (
            vehiculo.placa &&
            vehiculo.placa.toLowerCase().includes(this.filtro.toLowerCase())
          );
        });
      },
    },
    methods: {
      // guardar vehiculo por axios, json-server
      guardarVehiculo() {
        // el id debe incrementar +1 (se puede tomar como referencia el tamaño del array)
        this.vehiculo.id = this.vehiculos.length + 1;
        this.vehiculo.empleado = this.empleados.find(e => e.id === this.vehiculo.empleadoId);
  
        axios
          .post(`${process.env.VUE_APP_API_URL}/vehiculos`, this.vehiculo)
          .then((response) => {
            console.log(response);
            this.vehiculos.push(this.vehiculo);
            this.vehiculo = {
              id: 0,
              tipo: "",
              placa: "",
              color: "",
              empleadoId: "",
            };
          })
          .catch((error) => {
            console.error("Error saving vehicle:", error);
          });
      },
      // eliminar vehiculo por axios, json-server
      eliminarVehiculo(vehiculo) {
        // abrir el modal eliminar
        this.idEliminar = vehiculo.id;
  
        const modalElement = document.getElementById("eliminar");
        const modalInstance =
          Modal.getInstance(modalElement) || new Modal(modalElement);
        modalInstance.show();
      },
  
      // guardar vehiculo eliminado por axios, json-server
      guardarVehiculoEliminado() {
        axios
          .delete(`${process.env.VUE_APP_API_URL}/vehiculos/${this.idEliminar}`)
          .then((response) => {
            console.log(response);
            this.vehiculos = this.vehiculos.filter((v) => v.id !== this.idEliminar);
            // cerrar el modal eliminar
            const modalElement = document.getElementById("eliminar");
            const modalInstance =
              Modal.getInstance(modalElement) || new Modal(modalElement);
            modalInstance.hide();
          })
          .catch((error) => {
            console.error("Error deleting vehicle:", error);
          });
      },
  
      // editar vehiculo por axios, json-server
      editarVehiculo(vehiculo) {
        this.nuevoVehiculo = { ...vehiculo, empleadoId: vehiculo.empleado.id };
        // abrir el modal editar
        const modalElement = document.getElementById("editar");
        const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
        modalInstance.show();
      },
  
      // guardar vehiculo editado por axios, json-server
      guardarVehiculoEditado() {
        this.nuevoVehiculo.empleado = this.empleados.find(e => e.id === this.nuevoVehiculo.empleadoId);
  
        axios
          .put(
            `${process.env.VUE_APP_API_URL}/vehiculos/${this.nuevoVehiculo.id}`,
            this.nuevoVehiculo
          )
          .then((response) => {
            console.log(response);
            this.vehiculos = this.vehiculos.map((v) => {
              if (v.id === this.nuevoVehiculo.id) {
                return this.nuevoVehiculo;
              }
              return v;
            });
            this.nuevoVehiculo = {
              id: "",
              tipo: "",
              placa: "",
              color: "",
              empleadoId: "",
            };
            // cerrar el modal editar
            const modalElement = document.getElementById("editar");
            const modalInstance =
              Modal.getInstance(modalElement) || new Modal(modalElement);
            modalInstance.hide();
          })
          .catch((error) => {
            console.error("Error updating vehicle:", error);
          });
      },
    },
  
    name: "Vehiculos",
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