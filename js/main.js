class TetriMino {
	constructor(type) {
		if (!type.match(/I|O|L|J|S|Z/)) throw new Error("This type not found");
		this.type = type;
		this.moving = false;
	}
	apper() {
		switch (this.type) {
			case "O":
				let mino = [
					document.querySelector(`td[data-cellnum="0E"]`),
					document.querySelector(`td[data-cellnum="0F"]`),
					document.querySelector(`td[data-cellnum="1E"]`),
					document.querySelector(`td[data-cellnum="1F"]`)
				];
				mino.forEach(cell => {
					cell.style["background-color"] = "#252525";
					cell.dataset["tetristhere"] = true;
					cell.dataset["ismoving"] = true;
				});
		}
	}
	move(type) {
		if (!type.match(/DOWN|RIGHT|LEFT/)) throw new Error("Cannot move this type");
		const str = "ABCDEFGHIJ".split("");
		let mino = [...document.querySelectorAll(`td[data-ismoving="true"]`)];
		let next = [];
		// if (!!(mino.find(cell => parseInt(cell.dataset["cellnum"]) === 21))) return void 0;
		for (let cell of mino){
			let s = cell.dataset["cellnum"].split(/(.)$/).filter(x => x !== "");
			switch (type) {
				case "DOWN":
					s[0] = Number(s[0]) + 1;
					if (s[0] === 22) return void 0;
					next.push(document.querySelector(`td[data-cellnum="${s.join("")}"]`));
					break;
				case "RIGHT":
					{
						let x = str.indexOf(s[1]) + 1;
						if (x === 10) return void 0;
						s[1] = str[str.indexOf(s[1]) + 1];
						next.push(document.querySelector(`td[data-cellnum="${s.join("")}"]`));
						break;
					}
				case "LEFT":
					{
						let x = str.indexOf(s[1]) - 1;
						if (x === -1) return void 0;
						s[1] = str[str.indexOf(s[1]) - 1];
						next.push(document.querySelector(`td[data-cellnum="${s.join("")}"]`));
						break;
					}
			}
		};
		mino.forEach(cell => {
			cell.style["background-color"] = "#FFF";
			cell.dataset["tetristhere"] = false;
			cell.dataset["ismoving"] = false;
		});
		next.forEach(cell => {
			if (this.checkaround(mino).find(x => x === cell)) return void 0;
		});
		next.forEach(cell => {
			cell.style["background-color"] = "#252525";
			cell.dataset["tetristhere"] = true;
			cell.dataset["ismoving"] = true;
		});
	}
	checkaround(mino) {
		let blockthere = [];
		const s = "ABCDEFGHIJ".split("");
		mino.forEach(cell => {
			const where = cell.dataset["cellnum"].split(/(.)$/).filter(x => x !== "");
			let top = [],
				middle = [],
				under = [];
			top.push(document.querySelector(`td[data-cellnum="${where[0] - 1}${where[1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			top.push(document.querySelector(`td[data-cellnum="${where[0] - 1}${s[s.indexOf(where[1]) + 1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			top.push(document.querySelector(`td[data-cellnum="${where[0] - 1}${s[s.indexOf(where[1]) - 1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			middle.push(document.querySelector(`td[data-cellnum="${where[0]}${s[s.indexOf(where[1]) + 1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			middle.push(document.querySelector(`td[data-cellnum="${where[0]}${s[s.indexOf(where[1]) - 1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			under.push(document.querySelector(`td[data-cellnum="${where[0] + 1}${where[1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			under.push(document.querySelector(`td[data-cellnum="${where[0] + 1}${s[s.indexOf(where[1]) + 1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			under.push(document.querySelector(`td[data-cellnum="${where[0] + 1}${s[s.indexOf(where[1]) - 1]}"][data-tetristhere="true"][data-ismoving="false"]`));
			let arr = [...top, ...middle, ...under];
			arr = arr.filter(x => !!x);
			blockthere.push(arr);
		});
		return blockthere;
	}
}
const render = () => {
	const box = document.getElementById("render");
	let field = document.createElement("table");
	field.setAttribute("cellspacing", "0");
	field.setAttribute("cellpadding", "0");
	{
		let i = 0;
		let s = "ABCDEFGHIJ"
		while (i < 22) {
			let row = document.createElement("tr");
			let j = 0;
			while (j < 10) {
				let cell = document.createElement("td");
				cell.setAttribute("data-cellnum", `${i}${s[j]}`);
				cell.setAttribute("data-tetristhere", false);
				cell.setAttribute("data-ismoving", false);
				row.appendChild(cell);
				++j;
			}
			field.appendChild(row);
			++i;
		}
	}
	box.appendChild(field);
}
window.addEventListener("DOMContentLoaded", render);
window.addEventListener("keydown", () => {
	switch (event.keyCode) {
		case 40:
			nowmino.move("DOWN");
			break;
		case 37:
			nowmino.move("LEFT");
			break;
		case 39:
			nowmino.move("RIGHT");
			break;
	}
});