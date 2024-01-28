// selectores
const contenedorTarjetas = document.querySelector(".container-menu");
let btnMision;
let informacionAdicionalMision = document.querySelector(".container-modal");
let informacion;

document.addEventListener("DOMContentLoaded", () => {
  obtenerMisiones();
});

// CONSUMO DE API
async function obtenerMisiones() {
  const URL = "https://api.spacexdata.com/v3/launches";
  const respuesta = await fetch(URL);
  informacion = await respuesta.json();
  printMisiones(informacion);
}

// IMPRIMIR MISIONES
function printMisiones(misiones) {
  if (!misiones || misiones.length === 0) {
    const alerta = document.createElement("h2");
    alerta.textContent = "No se encontraron misiones";
    alerta.classList.add("alert");
    contenedorTarjetas.appendChild(alerta);
    return;
  }

  misiones.forEach((mision) => {
    const misionContainer = document.createElement("div");
    misionContainer.classList.add("card");
    misionContainer.innerHTML = `
      <img src=${mision.links.mission_patch_small} />
      <div class="card-body">
        <h5>${mision.mission_name}</h5>
        <h3>${mision.launch_year}</h3>
        <button id="${mision.flight_number}" onclick="informacionAdicional(${mision.flight_number})" class="btn btn-primary mision" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver info misión</button>
      </div>
    `;
    contenedorTarjetas.appendChild(misionContainer);
  });

  btnMision = document.querySelectorAll(".btn");

  btnMision.forEach((boton) => {
    boton.addEventListener("click", () => {
      let idVuelo = boton.id;
      informacionAdicional(idVuelo);
    });
  });
}

function informacionAdicional(idVuelo) {
  const misionSeleccionada = informacion.find((mision) => mision.flight_number == idVuelo);

  informacionAdicionalMision = document.querySelector(".container-modal");
  informacionAdicionalMision.innerHTML = `
    <!-- Modal Structure -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">SPACEX</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">Space Exploration Technologies Corp accordion 
            <p>Nombre Mision: ${misionSeleccionada.mission_name}</p>
            <iframe width="465" height="315" src="https://www.youtube.com/embed/${misionSeleccionada.links.video_link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <table class="table">
              <tbody>
                <tr>
                  <td>Cohete:</td>
                  <td>${misionSeleccionada.rocket.rocket_name}</td>
                </tr>
                <tr>
                  <td>Tipo Cohete:</td>
                  <td>${misionSeleccionada.rocket.rocket_type}</td>
                </tr>
                <tr>
                  <td>Exito Lanzamiento:</td>
                  <td>${misionSeleccionada.launch_success}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
