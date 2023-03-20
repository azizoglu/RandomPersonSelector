const selectStudentButton = document.getElementById('select-student-button');
const selectedStudentName = document.getElementById('student-name');
const selectedStudentEmail = document.getElementById('student-email');

selectStudentButton.addEventListener('click', () => {
  fetch('http://localhost:3000/get-random-person')
    .then(response => response.json())
    .then(student => {
		selectedStudentName.textContent = `${student.Ad} ${student.Soyad}`;
        selectedStudentEmail.textContent = `${student.Email}`;
		selectStudent();
    })
    .catch(error => {
		selectedStudentName.textContent = `Hata: ${error.message}`;
    });
});



function selectStudent() {
	
	var confetti = document.createElement("canvas");
	confetti.setAttribute("id", "confetti");
	document.body.appendChild(confetti);

	var canvas = document.getElementById("confetti");
	var ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var pieces = [];
	var numberOfPieces = 200;
	var lastUpdateTime = Date.now();

	function randomColor() {
		var colors = ["red", "blue", "yellow", "green", "pink", "purple"];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function Piece(x, y) {
		this.x = x;
		this.y = y;
		this.color = randomColor();
		this.radius = (Math.random() * 8) + 1;
		this.velX = (Math.random() * 8) - 4;
		this.velY = (Math.random() * 8) - 4;
	}

	Piece.prototype.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	function createPieces() {
		for (var i = 0; i < numberOfPieces; i++) {
			var x = (canvas.width / 2) + (Math.random() * 200) - 100;
			var y = (canvas.height / 2) + (Math.random() * 200) - 100;
			pieces.push(new Piece(x, y));
		}
	}

	function update() {
		var now = Date.now();
		var dt = now - lastUpdateTime;

		for (var i = 0; i < pieces.length; i++) {
			var piece = pieces[i];

			if (piece.y < -20) {
				piece.y = canvas.height + 20;
			}

			piece.y -= piece.velY * (dt / 1000);
			piece.x += piece.velX * (dt / 1000);
		}

		lastUpdateTime = now;
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < pieces.length; i++) {
			var piece = pieces[i];

			ctx.beginPath();
			ctx.arc(piece.x, piece.y, piece.radius, 0, Math.PI * 2);
			ctx.fillStyle = piece.color;
			ctx.fill();

			piece.y -= piece.velY;
			piece.x += piece.velX;

			if (piece.y < -20) {
				piece.y = canvas.height + 20;
			}
		}

		requestAnimationFrame(draw);
	}

	createPieces();
	requestAnimationFrame(draw);
}
