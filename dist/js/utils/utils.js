const getFullName = (fullName) => {
    return fullName.split(" ")[0]
}

export {getFullName}





export function calculaFibonacci(num) {
	console.log(num)
	let fibonacciList = [0,1]
	
	for (let i=2; i < num; i++) {
			fibonacciList.push(fibonacciList[i-1] + fibonacciList[i-2])
	}
	
	let pinta = document.getElementById("output")
	pinta.innerHTML = fibonacciList
  alert(fibonacciList)
}

