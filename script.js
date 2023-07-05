const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

let ticketPrice = +movieSelect.value;

const populateUI = function () {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (!selectedSeats && selectedSeats.length < 0) return;
  seats.forEach((seat, index) => {
    if (selectedSeats.indexOf(index) > -1) {
      seat.classList.add("selected");
    }
  });

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

const saveMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

const updateSelectedCount = function () {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeat.length;

  const seatsIndex = [...selectedSeat].map((s) => {
    return [...seats].indexOf(s);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
};

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  saveMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("seat")) return;
  target.classList.toggle("selected");
  updateSelectedCount();
});

populateUI();
updateSelectedCount();
