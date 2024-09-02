const readLine = require('readline');

const rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Computing e^(-t^2)
function integrand(t) {
	return Math.exp(-t*t);
}

function trapezoidalRule(x, n) {
	
	const h = x / n; //step size
	let sum = 0.5 * (integrand(0) + integrand(x)); //starting with the end points
	
	//summing up the intermediate values
	for (let i = 1; i < n; i++) {
		
		let t = i * h;
		sum += integrand(t);
		
	}
	
	return sum * h;

}

function riamannSum(x, n) {
	
	const deltaX = x/ n; //deltaX is the width of each subInterval
	let sum = 0;
	
	//Midpoint Riemann sum
	for (let i = 0; i < n; i++) {
		
		let midPoint = (i + 0.5) * deltaX;
		sum += Math.exp(-midPoint * midPoint);
		
	}
	
	// Multiplying the width of each rectangle (deltaX)
	return sum * deltaX;
	
}

async function getUserInput() {
	
	rl.question("Enter value of x (upper bound of the integral) >> ", (xInput => {
		const x = parseFloat(xInput);
		// Include error handling if statement for upper bound input value
		
		rl.question("Which method to use 1: Trapezoidal Rule ; 2: Riemann Sum ? (Please write the number only) >> ", (methodInput => {
			const method = parseInt(methodInput);
			const n = 1000 //Number of intervals
			
			// calling specified method
			if (method === 1) 
			{
				const result = trapezoidalRule(x,n);
				console.log("\nThe approximate value of the Guassian Integral in terms of Trapezoidal Rule is: ", result);
			} else if (method === 2) 
			{
				const result = riamannSum(x, n);
				console.log("\nThe approximate value of the Guassian Integral in terms of Riemann Sum is: ", result);
			} else 
			{
				console.log("Invalid method choice. Please try again.");
			}
			
			continuePrompt();
			
		}));
	}));
}

function continuePrompt() {

	rl.question("\nDo you want to go again? 1: Yes | 2: No >> ", (mainInput => {
		const choice = parseInt(mainInput);
		if (choice === 1) 
		{
			getUserInput(); //recursive call until user opts out
		} else
		{
			//closing readLine io interface and end program here
			rl.close();
			process.exit();
		}
	}));
}

// program starts here
getUserInput();

//CODE ENDS HERE!


